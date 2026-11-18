import React, { useEffect, useState, useRef } from 'react';
import { EDP_SLIDE_MAP } from '../data/edpSlides';

const SCENES = {
  desktop: 'https://prod.spline.design/QzFYO-pwcQCbiF9t/scene.splinecode',
  tablet: 'https://prod.spline.design/PHP6Gm7o6Xu4ObTR/scene.splinecode',
  mobile: 'https://prod.spline.design/jm2f-1D-xUTZN6UB/scene.splinecode'
};

/**
 * Renders an application screenshot proportionally contained onto a square canvas
 * texture so screenshots retain aspect ratio inside square 3D panels without
 * cropping or stretching.
 */
function createContainedTexture(TexCtor, imageSrc) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const size = 768;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#070b0f';
      ctx.fillRect(0, 0, size, size);

      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      const aspect = iw / (ih || 1);

      // Cover fill for balanced framing; for wide 16:9 UI/logo cards, use a subtle blurred backdrop + full-width fit so faces/logos are never clipped
      if (aspect >= 1.65) {
        const bgScale = Math.max(size / iw, size / ih);
        ctx.save();
        ctx.filter = 'blur(22px) brightness(0.45) saturate(1.25)';
        ctx.drawImage(
          img,
          (size - iw * bgScale) * 0.5,
          (size - ih * bgScale) * 0.5,
          iw * bgScale,
          ih * bgScale
        );
        ctx.restore();

        const fgScale = Math.min((size * 0.94) / iw, (size * 0.94) / ih);
        const dw = iw * fgScale;
        const dh = ih * fgScale;
        ctx.save();
        ctx.filter = 'contrast(1.12) saturate(1.2) brightness(1.04)';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
        ctx.shadowBlur = 24;
        ctx.drawImage(img, (size - dw) * 0.5, (size - dh) * 0.5, dw, dh);
        ctx.restore();
      } else {
        const scale = Math.max(size / iw, size / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        ctx.save();
        ctx.filter = 'contrast(1.14) saturate(1.22) brightness(1.03)';
        ctx.drawImage(img, (size - dw) * 0.5, (size - dh) * 0.5, dw, dh);
        ctx.restore();
      }

      const tex = new TexCtor(canvas);
      tex.anisotropy = 8;
      tex.generateMipmaps = true;
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.onerror = (err) => reject(err);
    img.src = imageSrc;
  });
}

function getSplineApp(viewer) {
  if (!viewer) return null;
  if (viewer._spline && viewer._spline._scene) return viewer._spline;
  if (viewer._app && viewer._app._scene) return viewer._app;
  return Object.values(viewer).find((v) => v && typeof v === 'object' && v._scene) || null;
}

function getSceneMode() {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width <= 809) return 'mobile';
  if (width <= 1199) return 'tablet';
  return 'desktop';
}

function findTextureCtor(scene, sampleMesh) {
  const sampleUniforms = sampleMesh?.material?.uniforms;
  if (sampleUniforms) {
    for (const entry of Object.values(sampleUniforms)) {
      if (entry?.value?.isTexture) return entry.value.constructor;
    }
  }
  let found = null;
  scene.traverse((obj) => {
    if (found) return;
    const uniforms = obj.material?.uniforms;
    if (!uniforms) return;
    for (const entry of Object.values(uniforms)) {
      if (entry?.value?.isTexture) {
        found = entry.value.constructor;
        return;
      }
    }
  });
  return found;
}

function cloneShaderMaterial(origMat) {
  let proto = Object.getPrototypeOf(origMat);
  let ShaderMatCtor = null;
  while (proto && proto !== Object.prototype) {
    const Ctor = proto.constructor;
    if (Ctor && Ctor.toString().includes('this.type="ShaderMaterial"')) {
      ShaderMatCtor = Ctor;
      break;
    }
    proto = Object.getPrototypeOf(proto);
  }
  if (!ShaderMatCtor) return null;

  const cloned = new ShaderMatCtor();
  ShaderMatCtor.prototype.copy.call(cloned, origMat);
  cloned.uniforms = { ...(origMat.uniforms || {}) };
  cloned.defines = { ...(origMat.defines || {}) };
  if (origMat.layers !== undefined) cloned.layers = origMat.layers;
  if (origMat.data !== undefined) cloned.data = origMat.data;
  if (typeof origMat.setTransparent === 'function') cloned.setTransparent = () => {};
  return cloned;
}

function computeBestUvAxes(mesh, cam) {
  mesh.updateMatrixWorld(true);
  const e = mesh.matrixWorld.elements;
  const ce = cam.matrixWorld.elements;
  const nx = [e[0], e[1], e[2]];
  const ny = [e[4], e[5], e[6]];
  const camRight = [ce[0], ce[1], ce[2]];
  const camUp = [ce[4], ce[5], ce[6]];

  const nxR = nx[0] * camRight[0] + nx[1] * camRight[1] + nx[2] * camRight[2];
  const nxU = nx[0] * camUp[0] + nx[1] * camUp[1] + nx[2] * camUp[2];
  const nyR = ny[0] * camRight[0] + ny[1] * camRight[1] + ny[2] * camRight[2];
  const nyU = ny[0] * camUp[0] + ny[1] * camUp[1] + ny[2] * camUp[2];

  // Candidate (u, v) pairs preserve unmirrored orientation on the local -Z front face (u x v = -Z)
  const candidates = [
    { u: { x: 1, y: 0 }, v: { x: 0, y: -1 }, score: nxR + -nyU },
    { u: { x: 0, y: 1 }, v: { x: 1, y: 0 }, score: nyR + nxU },
    { u: { x: -1, y: 0 }, v: { x: 0, y: 1 }, score: -nxR + nyU },
    { u: { x: 0, y: -1 }, v: { x: -1, y: 0 }, score: -nyR + -nxU }
  ];

  let best = candidates[0];
  for (const cand of candidates) {
    if (cand.score > best.score) best = cand;
  }
  return best;
}

export const SplineHero = () => {
  const [sceneMode, setSceneMode] = useState(getSceneMode);
  const sceneUrl = SCENES[sceneMode];
  const [loaded, setLoaded] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [hoveredSlide, setHoveredSlide] = useState(null);
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const injectedScreensRef = useRef([]);

  // Responsive scene resolution matching reference breakpoints
  useEffect(() => {
    const updateScene = () => {
      const next = getSceneMode();
      setSceneMode((prev) => {
        if (prev !== next) setLoaded(false);
        return next;
      });
    };

    window.addEventListener('resize', updateScene);
    return () => window.removeEventListener('resize', updateScene);
  }, []);

  // Scroll-linked visibility & fade-out starting once Explore Catalogue heading is reached
  // (as `.catalogue-checker-grid` enters near 78% viewport height, matching reference screenshot).
  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight || 900;
      setInHero(window.scrollY < vh * 0.45);

      const storySection = document.querySelector('.story-heart-section');
      const storyTop = storySection ? storySection.getBoundingClientRect().top : Infinity;
      const storyBlurProgress = storySection
        ? Math.min(1, Math.max(0, (vh * 0.88 - storyTop) / (vh * 0.42)))
        : 0;

      const catGrid = document.querySelector('.catalogue-checker-grid');
      if (catGrid) {
        const gridTop = catGrid.getBoundingClientRect().top;
        const fadeStart = vh * 0.70;
        const fadeEnd = vh * 0.28;
        const fadeProgress = Math.min(1, Math.max(0, (fadeStart - gridTop) / (fadeStart - fadeEnd)));

        if (containerRef.current && loaded) {
          const baseOpacity = Math.max(0, (1 - storyBlurProgress * 0.52) * (1 - fadeProgress));
          const blurPx = Math.round(storyBlurProgress * 12);
          containerRef.current.style.opacity = String(baseOpacity);
          containerRef.current.style.filter = blurPx > 0 ? `blur(${blurPx}px)` : 'none';
          containerRef.current.style.transform = `translate3d(0, ${-Math.round(fadeProgress * 120)}px, 0)`;
        }

        setScrolledPast(fadeProgress >= 1);
        return;
      }

      if (storySection) {
        const storyBottom = storySection.getBoundingClientRect().bottom;
        const fadeStart = vh * 0.88;
        const fadeEnd = vh * 0.25;
        const fadeProgress = Math.min(1, Math.max(0, (fadeStart - storyBottom) / (fadeStart - fadeEnd)));

        if (containerRef.current && loaded) {
          const baseOpacity = Math.max(0, (1 - storyBlurProgress * 0.52) * (1 - fadeProgress));
          const blurPx = Math.round(storyBlurProgress * 12);
          containerRef.current.style.opacity = String(baseOpacity);
          containerRef.current.style.filter = blurPx > 0 ? `blur(${blurPx}px)` : 'none';
          containerRef.current.style.transform = `translate3d(0, ${-Math.round(fadeProgress * 120)}px, 0)`;
        }

        setScrolledPast(fadeProgress >= 1);
        return;
      }

      const cover = document.querySelector('[data-spline-cover]');
      if (cover) {
        setScrolledPast(cover.getBoundingClientRect().top <= 0);
      } else {
        setScrolledPast(window.scrollY > vh * 3);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [loaded]);

  // Handle load event, badge removal, and EDP application screenshot integration
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    let cancelled = false;
    let attached = false;
    let attaching = false;
    let sceneLoaded = false;
    const resyncTimers = [];

    const forceRender = (app) => {
      if (!app) return;
      if ('_skipRender' in app) app._skipRender = false;
      app.requestRender?.();
    };

    const wrappedScrollEvents = [];

    const attachExtendedScrollRange = (appInstance) => {
      const handlers = appInstance?._eventManager?.handlers;
      if (!handlers) return;
      const scrollHandler = handlers instanceof Map ? handlers.get('Scroll') : handlers.Scroll;
      const mapOrObj = scrollHandler?.scrollEventsPerObject;
      if (!mapOrObj) return;

      const entries = mapOrObj instanceof Map ? Array.from(mapOrObj.values()) : Object.values(mapOrObj);
      for (const group of entries) {
        const list = Array.isArray(group) ? group : [group];
        for (const ev of list) {
          if (!ev || typeof ev.dispatch !== 'function' || ev._edpOriginalDispatch) continue;
          ev._edpOriginalDispatch = ev.dispatch;
          const nativeEnd = ev.data?.endAfter || ev.scrollEnd || 3200;
          ev.dispatch = function (scrollPos) {
            if (!scrollPos || typeof scrollPos.y !== 'number') {
              return ev._edpOriginalDispatch.call(this, scrollPos);
            }
            const vh = window.innerHeight || 900;
            // Preserve Hero -> Quick Access 1:1 so initial 3D card overlap is untouched
            const preserveUntil = Math.min(1150, vh * 1.25);
            if (scrollPos.y <= preserveUntil) {
              return ev._edpOriginalDispatch.call(this, scrollPos);
            }
            const catGrid = document.querySelector('.catalogue-checker-grid');
            const storySection = document.querySelector('.story-heart-section');
            const cover = document.querySelector('[data-spline-cover]');
            const endScrollY = catGrid
              ? catGrid.getBoundingClientRect().top + window.scrollY + vh * 0.15
              : storySection
                ? storySection.getBoundingClientRect().bottom + window.scrollY
                : cover
                  ? cover.getBoundingClientRect().top + window.scrollY
                  : vh * 5.5;
            const span = Math.max(1200, endScrollY - preserveUntil);
            const progress = Math.min(1, Math.max(0, (scrollPos.y - preserveUntil) / span));
            const mappedY = preserveUntil + progress * (nativeEnd - preserveUntil);
            return ev._edpOriginalDispatch.call(this, { x: scrollPos.x, y: mappedY });
          };
          wrappedScrollEvents.push(ev);
        }
      }

      scrollHandler.onScroll?.();
    };

    const cleanupInjected = () => {
      for (const ev of wrappedScrollEvents) {
        if (ev && ev._edpOriginalDispatch) {
          ev.dispatch = ev._edpOriginalDispatch;
          delete ev._edpOriginalDispatch;
        }
      }
      wrappedScrollEvents.length = 0;

      for (const entry of injectedScreensRef.current) {
        try {
          if (entry.mesh && entry.origMat) {
            entry.mesh.material = entry.origMat;
          }
          if (entry.mat && entry.mat !== entry.origMat) {
            entry.mat.dispose?.();
          }
          if (entry.mesh?.userData) {
            delete entry.mesh.userData.edpScreenKey;
          }
          entry.tex?.dispose?.();
        } catch {
          // Ignore cleanup errors during unmount/scene reload
        }
      }
      injectedScreensRef.current = [];
    };

    const attachEdpScreens = async () => {
      if (cancelled || attached || attaching) return false;
      const app = getSplineApp(viewer);
      const scene = app?._scene;
      const cam = app?._camera || scene?.activeCamera;
      if (!scene || !cam) return false;

      const cloneMeshes = new Map();
      let sampleMesh = null;

      scene.traverse((obj) => {
        if (!/^Clone \d+$/.test(obj.name || '')) return;
        let target = null;
        obj.traverse((child) => {
          if (!target && child.isMesh && child.name === 'Squares') {
            target = child;
          }
        });
        if (!target) {
          obj.traverse((child) => {
            if (!target && child.isMesh) target = child;
          });
        }
        if (target) {
          cloneMeshes.set(obj.name, target);
          if (!sampleMesh) sampleMesh = target;
        }
      });

      if (!sampleMesh || cloneMeshes.size === 0) return false;

      const TexCtor = findTextureCtor(scene, sampleMesh);
      if (!TexCtor) return false;

      attaching = true;
      try {
        // Preload all slide textures first so all panel orientations are computed together in one settled frame
        const loadedSlides = await Promise.all(
          EDP_SLIDE_MAP.filter((s) => s.image).map(async (slide) => {
            const cloneName = slide.cloneNames?.[sceneMode] || slide.cloneName;
            const targetMesh = cloneMeshes.get(cloneName);
            if (!targetMesh || targetMesh.userData?.edpScreenKey === slide.key) return null;
            try {
              const tex = await createContainedTexture(TexCtor, slide.image);
              if (cancelled) {
                tex.dispose?.();
                return null;
              }
              return { slide, targetMesh, tex };
            } catch {
              return null;
            }
          })
        );

        if (cancelled) return false;

        scene.updateMatrixWorld(true);
        cam.updateMatrixWorld(true);

        for (const item of loadedSlides) {
          if (!item) continue;
          const { slide, targetMesh, tex } = item;

          try {
            const origMat = targetMesh.material;
            const mat = cloneShaderMaterial(origMat);
            if (!mat) {
              tex.dispose?.();
              continue;
            }

            const origVertex = mat.vertexShader;
            const origFragment = mat.fragmentShader;
            if (!origFragment?.includes('#include <dithering_fragment>')) {
              tex.dispose?.();
              mat.dispose?.();
              continue;
            }

            const axes = computeBestUvAxes(targetMesh, cam);
            mat.uniforms.uEdpMap = { value: tex };
            mat.uniforms.uEdpUAxis = { value: axes.u };
            mat.uniforms.uEdpVAxis = { value: axes.v };

            if (!origVertex.includes('vEdpLocalPos')) {
              mat.vertexShader = origVertex.replace(
                'void main() {',
                `varying vec3 vEdpLocalPos;\nvarying vec3 vEdpLocalNormal;\nvoid main() {\n  vEdpLocalPos = position;\n  vEdpLocalNormal = normal;`
              );
            }

            if (!origFragment.includes('uEdpMap')) {
              let nextFrag = origFragment.replace(
                'void main() {',
                `uniform sampler2D uEdpMap;\nuniform vec2 uEdpUAxis;\nuniform vec2 uEdpVAxis;\nvarying vec3 vEdpLocalPos;\nvarying vec3 vEdpLocalNormal;\nvoid main() {`
              );
              nextFrag = nextFrag.replace(
                '#include <dithering_fragment>',
                `{
                  float edpFrontMask = step(vEdpLocalPos.z, 0.25) * step(0.85, -vEdpLocalNormal.z);
                  vec2 edpHalf = vec2(178.0);
                  float edpRadius = 24.0;
                  vec2 edpQ = abs(vEdpLocalPos.xy) - (edpHalf - vec2(edpRadius));
                  float edpDist = length(max(edpQ, 0.0)) + min(max(edpQ.x, edpQ.y), 0.0) - edpRadius;
                  float edpInnerMask = edpFrontMask * (1.0 - smoothstep(-1.5, 0.5, edpDist));
                  float edpSeamMask = edpFrontMask * smoothstep(-3.5, -1.0, edpDist) * (1.0 - smoothstep(0.0, 2.5, edpDist));

                  vec2 edpNorm = vEdpLocalPos.xy / (edpHalf * 2.0);
                  vec2 edpUv = vec2(dot(edpNorm, uEdpUAxis), dot(edpNorm, uEdpVAxis)) + vec2(0.5);
                  vec3 edpShot = texture2D(uEdpMap, clamp(edpUv, 0.0, 1.0)).rgb;

                  // Rich OLED contrast & vibrance without milky grey haze
                  vec3 edpContrast = mix(edpShot, smoothstep(0.03, 0.97, edpShot), 0.35);
                  // Subtle edge vignette for recessed glass depth inside the silver frame
                  float edpVignette = 1.0 - 0.18 * smoothstep(-26.0, -1.5, edpDist);
                  // Crisp diagonal glass specular glint (bright highlight band rather than flat wash)
                  float edpGlint = pow(clamp(1.0 - abs((edpUv.x * 0.65 + (1.0 - edpUv.y) * 0.65) - 0.48) * 2.4, 0.0, 1.0), 4.0);
                  float edpRimSpec = smoothstep(0.35, 0.95, gl_FragColor.r) * 0.06;
                  vec3 edpComposited = edpContrast * edpVignette + vec3(0.14) * edpGlint + vec3(edpRimSpec);

                  gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * 0.22, edpSeamMask * 0.78);
                  gl_FragColor.rgb = mix(gl_FragColor.rgb, clamp(edpComposited, 0.0, 1.0), edpInnerMask);
                }
                #include <dithering_fragment>`
              );
              mat.fragmentShader = nextFrag;
            }

            mat.customProgramCacheKey = () => `edp-screen-${slide.key}`;
            mat.needsUpdate = true;
            targetMesh.material = mat;
            targetMesh.userData.edpScreenKey = slide.key;
            injectedScreensRef.current.push({
              mesh: targetMesh,
              mat,
              origMat,
              tex,
              slide
            });
          } catch {
            tex.dispose?.();
          }
        }

        attachExtendedScrollRange(app);
        forceRender(app);
        attached = true;

        // Re-sync upright orientation across initial Spline intro settle delays while user has not scrolled
        for (const delayMs of [600, 1500, 3000, 5000]) {
          resyncTimers.push(
            setTimeout(() => {
              if (cancelled || window.scrollY >= 40) return;
              const curApp = getSplineApp(viewer);
              const curScene = curApp?._scene;
              const curCam = curApp?._camera || curScene?.activeCamera;
              if (!curScene || !curCam) return;
              curScene.updateMatrixWorld(true);
              curCam.updateMatrixWorld(true);
              for (const entry of injectedScreensRef.current) {
                if (!entry.mesh || !entry.mat?.uniforms?.uEdpUAxis) continue;
                const best = computeBestUvAxes(entry.mesh, curCam);
                entry.mat.uniforms.uEdpUAxis.value = best.u;
                entry.mat.uniforms.uEdpVAxis.value = best.v;
              }
              forceRender(curApp);
            }, delayMs)
          );
        }

        return true;
      } finally {
        attaching = false;
      }
    };

    const removeBadge = () => {
      if (viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo');
        if (logo) logo.remove();
      }
    };

    const onLoad = () => {
      sceneLoaded = true;
      setLoaded(true);
      removeBadge();
      requestAnimationFrame(() => {
        if (!cancelled) attachEdpScreens();
      });
    };

    viewer.addEventListener('load-complete', onLoad);
    viewer.addEventListener('load', onLoad);

    let pollCount = 0;
    const pollTimer = setInterval(async () => {
      pollCount += 1;
      if (cancelled || attached || pollCount > 80) {
        clearInterval(pollTimer);
        return;
      }
      if (!sceneLoaded && pollCount < 15) return;
      await attachEdpScreens();
    }, 200);

    // Fallback timer to reveal scene if event was already fired
    const timer = setTimeout(() => {
      sceneLoaded = true;
      setLoaded(true);
      removeBadge();
      attachEdpScreens();
    }, 2500);

    return () => {
      cancelled = true;
      viewer.removeEventListener('load-complete', onLoad);
      viewer.removeEventListener('load', onLoad);
      clearInterval(pollTimer);
      clearTimeout(timer);
      for (const id of resyncTimers) clearTimeout(id);
      cleanupInjected();
    };
  }, [sceneMode, sceneUrl]);

  // Raycast pointer against the 3D rotating squares to show the hovered item tooltip
  useEffect(() => {
    if (scrolledPast) {
      setHoveredSlide(null);
      return;
    }

    const hitTestBoxes = (clientX, clientY) => {
      const entries = injectedScreensRef.current;
      if (!entries.length) {
        setHoveredSlide(null);
        return;
      }

      const app = getSplineApp(viewerRef.current);
      const cam = app?._camera || app?._scene?.activeCamera;
      if (!cam?.projectionMatrixInverse || !cam?.matrixWorld) return;

      const ndcX = (clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(clientY / window.innerHeight) * 2 + 1;

      cam.updateMatrixWorld(true);
      const invP = cam.projectionMatrixInverse.elements;
      const camW = cam.matrixWorld.elements;

      // Unproject NDC point on near plane (z = -1) to view space then world space
      const vx = invP[0] * ndcX + invP[4] * ndcY - invP[8] + invP[12];
      const vy = invP[1] * ndcX + invP[5] * ndcY - invP[9] + invP[13];
      const vz = invP[2] * ndcX + invP[6] * ndcY - invP[10] + invP[14];
      const vw = invP[3] * ndcX + invP[7] * ndcY - invP[11] + invP[15] || 1;
      const pvx = vx / vw;
      const pvy = vy / vw;
      const pvz = vz / vw;

      const pwx = camW[0] * pvx + camW[4] * pvy + camW[8] * pvz + camW[12];
      const pwy = camW[1] * pvx + camW[5] * pvy + camW[9] * pvz + camW[13];
      const pwz = camW[2] * pvx + camW[6] * pvy + camW[10] * pvz + camW[14];

      const ox = camW[12];
      const oy = camW[13];
      const oz = camW[14];
      let dx = pwx - ox;
      let dy = pwy - oy;
      let dz = pwz - oz;
      const dLen = Math.hypot(dx, dy, dz) || 1;
      dx /= dLen;
      dy /= dLen;
      dz /= dLen;

      let closestT = Infinity;
      let hitSlide = null;

      for (const entry of entries) {
        const mesh = entry.mesh;
        if (!mesh || !entry.slide) continue;
        mesh.updateMatrixWorld(true);
        const m = mesh.matrixWorld.elements;

        // Front face is local z = 0 with outward normal -Z
        const nx = -m[8];
        const ny = -m[9];
        const nz = -m[10];
        const denom = dx * nx + dy * ny + dz * nz;
        if (denom >= -1e-4) continue;

        const px = m[12];
        const py = m[13];
        const pz = m[14];
        const t = ((px - ox) * nx + (py - oy) * ny + (pz - oz) * nz) / denom;
        if (t <= 0 || t >= closestT) continue;

        const hx = ox + dx * t - px;
        const hy = oy + dy * t - py;
        const hz = oz + dz * t - pz;

        const ux = m[0];
        const uy = m[1];
        const uz = m[2];
        const vxAxis = m[4];
        const vyAxis = m[5];
        const vzAxis = m[6];

        const uLen2 = ux * ux + uy * uy + uz * uz || 1;
        const vLen2 = vxAxis * vxAxis + vyAxis * vyAxis + vzAxis * vzAxis || 1;
        const localX = (hx * ux + hy * uy + hz * uz) / uLen2;
        const localY = (hx * vxAxis + hy * vyAxis + hz * vzAxis) / vLen2;

        if (Math.abs(localX) <= 198 && Math.abs(localY) <= 198) {
          closestT = t;
          hitSlide = entry.slide;
        }
      }

      if (hitSlide) {
        setHoveredSlide({
          name: hitSlide.name,
          category: hitSlide.category,
          x: clientX,
          y: clientY
        });
      } else {
        setHoveredSlide(null);
      }
    };

    const onPointerMove = (e) => {
      // Ignore hover when pointer is over header or hero interactive controls
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el && (el.closest('header') || el.closest('a, button'))) {
        setHoveredSlide(null);
        return;
      }
      hitTestBoxes(e.clientX, e.clientY);
    };

    const onPointerLeave = () => setHoveredSlide(null);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('scroll', onPointerLeave, { passive: true });
    window.addEventListener('blur', onPointerLeave);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
    };
  }, [scrolledPast]);

  const tooltipLeft = hoveredSlide
    ? Math.min(hoveredSlide.x + 16, (typeof window !== 'undefined' ? window.innerWidth : 1440) - 260)
    : 0;
  const tooltipTop = hoveredSlide
    ? Math.min(hoveredSlide.y + 16, (typeof window !== 'undefined' ? window.innerHeight : 900) - 72)
    : 0;

  return (
    <>
      <div
        ref={containerRef}
        className="mobile-spline"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 8,
          pointerEvents: inHero && !scrolledPast ? 'auto' : 'none',
          opacity: scrolledPast ? 0 : loaded ? 1 : 0.001,
          visibility: scrolledPast ? 'hidden' : 'visible',
          transition: loaded ? 'opacity 0.12s linear, transform 0.12s linear' : 'opacity 1s ease',
          willChange: 'opacity, transform',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          touchAction: 'pan-y'
        }}
        aria-hidden="true"
      >
        <spline-viewer
          key={sceneMode}
          ref={viewerRef}
          loading="eager"
          renderer="webgl"
          url={sceneUrl}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            outline: 'none',
            touchAction: 'pan-y'
          }}
        />
      </div>

      {hoveredSlide && !scrolledPast && (
        <div
          role="tooltip"
          style={{
            position: 'fixed',
            left: `${tooltipLeft}px`,
            top: `${tooltipTop}px`,
            zIndex: 50,
            pointerEvents: 'none',
            background: 'rgba(10, 15, 20, 0.9)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(116, 170, 80, 0.55)',
            boxShadow: '0 10px 28px rgba(0, 0, 0, 0.5)',
            borderRadius: '12px',
            padding: '8px 13px',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            maxWidth: '240px'
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#74AA50'
            }}
          >
            {hoveredSlide.category}
          </span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: 1.25,
              color: '#f3f6f8'
            }}
          >
            {hoveredSlide.name}
          </span>
        </div>
      )}
    </>
  );
};
