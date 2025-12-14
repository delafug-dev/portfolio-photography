# Guía Completa: Portfolio Masonry con AVIF/WebP en Astro

**Tu configuración elegida:**
- Exportar desde Lightroom: JPG (85-90%, sRGB, 2048-2500px lado largo)
- Astro convierte automáticamente a AVIF + WebP
- Imágenes en `src/assets/photos` con optimización automática
- Efectos hover: zoom suave
- Sistema de metadata JSON
- Lightbox para ampliar imágenes
- Container masonry con padding adaptable
- Tailwind CSS v4

---

## Fase 1: Estructura del proyecto

### 1.1 Crear la estructura de carpetas

Ejecuta estos comandos en tu terminal (desde la raíz del proyecto):

```bash
mkdir src\assets\photos
mkdir src\content\photos
mkdir src\components
mkdir src\types
```

Tu estructura quedará así:
```
src/
├── assets/
│   └── photos/           # Aquí van tus JPG exportados desde Lightroom
├── content/
│   └── photos/
│       └── metadata.json # Información de cada foto
├── components/
│   └── PhotoGallery.astro # Componente del grid masonry
├── types/
│   └── photo.ts          # TypeScript types
└── pages/
    └── index.astro       # Tu página principal
```

**¿Por qué esta estructura?**
- `src/assets/photos/`: Astro optimiza automáticamente las imágenes aquí (JPG → AVIF/WebP)
- `src/content/photos/`: Guardamos metadata (dimensiones, alt text, títulos)
- Separación clara entre assets y data

---

## Fase 2: Exportar y preparar tus imágenes desde Lightroom

### 2.1 Configuración de exportación en Lightroom Classic

**Ubicación de archivo:**
- Exportar a: `C:\Users\User\desktop\adrian\Programación\portfolio-photography\src\assets\photos`
- Nombrar: `photo-1.jpg`, `photo-2.jpg`, etc. (o nombres descriptivos como `paisaje-montaña.jpg`)

**Configuración de archivo:**
- Formato de imagen: **JPEG**
- Espacio de color: **sRGB**
- Calidad: **85-90%** (el sweet spot)
- Limitar tamaño de archivo: No marcar

**Tamaño de imagen:**
- Redimensionar para ajustar: **Lado largo**
- Tamaño: **2048-2500 píxeles**
- Resolución: **72 píxeles por pulgada** (suficiente para pantalla)
- No ampliar: Marcado

**Enfoque de salida:**
- Enfocar para: **Pantalla**
- Cantidad: **Estándar**

**Metadata:**
- Incluir: Todo (o solo Copyright + palabras clave, según prefieras)
- Escribir palabras clave como Lightroom Hierarchy: Opcional

### 2.2 Nombres de archivo recomendados

Elige una de estas estrategias:

**Opción A: Números secuenciales (simple)**
```
photo-1.jpg
photo-2.jpg
photo-3.jpg
```

**Opción B: Nombres descriptivos (mejor para SEO)**
```
retrato-urbano-noche.jpg
paisaje-costa-amanecer.jpg
arquitectura-moderna-detalle.jpg
```

**Opción C: Híbrido (organizado + descriptivo)**
```
2024-01-retrato-urbano.jpg
2024-02-paisaje-costa.jpg
```

Elige el que te resulte más cómodo. **Importante:** Usa solo letras, números y guiones. Sin espacios, acentos ni caracteres especiales.

### 2.3 ¿Qué hace Astro con tus JPG?

Cuando hagas el build (`npm run build`), Astro automáticamente:

1. Toma tu JPG de 5MB en sRGB
2. Genera versión AVIF (~2MB, mismos colores)
3. Genera versión WebP (~3MB, mismos colores)
4. Crea múltiples tamaños para responsive (srcset)
5. El navegador carga la más pequeña que soporte

**Resultado:** Tus fotos pesan 60% menos sin perder calidad ni colores.

---

## Fase 3: Configurar TypeScript

### 3.1 Crear los tipos

Crea el archivo `src/types/photo.ts`:

```typescript
export interface Photo {
  id: string;           // Identificador único (ej: "photo-1")
  filename: string;     // Nombre del archivo (ej: "photo-1.jpg")
  width: number;        // Ancho en píxeles (exportado desde Lightroom)
  height: number;       // Alto en píxeles (exportado desde Lightroom)
  alt: string;          // Descripción para accesibilidad y SEO
  title?: string;       // Título opcional para mostrar en lightbox
  description?: string; // Descripción larga opcional
}

export interface PhotoWithRatio extends Photo {
  aspectRatio: number;  // Calculado automáticamente: width / height
  src: any;             // Módulo de imagen de Astro
}
```

**¿Por qué TypeScript?**
- Previene errores (te avisa si falta un campo)
- Autocompletado en VS Code
- Documentación clara de la estructura

---

## Fase 4: Crear el metadata.json

### 4.1 ¿Cómo obtener las dimensiones de tus fotos?

**Opción A: En Windows Explorer**
1. Ve a la carpeta `src/assets/photos/`
2. Clic derecho en la imagen > Propiedades > Detalles
3. Busca "Dimensiones" (ej: 2500 × 1667)

**Opción B: Lightroom te las muestra**
- En la exportación, Lightroom muestra las dimensiones finales

### 4.2 Crear el archivo metadata.json

Crea `src/content/photos/metadata.json` (empieza con 2-3 fotos de prueba):

```json
[
  {
    "id": "photo-1",
    "filename": "photo-1.jpg",
    "width": 2500,
    "height": 1667,
    "alt": "Paisaje de montaña al amanecer con niebla",
    "title": "Montaña al Amanecer",
    "description": "Capturada en los Pirineos durante un amanecer de invierno"
  },
  {
    "id": "photo-2",
    "filename": "photo-2.jpg",
    "width": 1667,
    "height": 2500,
    "alt": "Retrato en blanco y negro con luz natural",
    "title": "Luz Natural",
    "description": "Retrato minimalista con ventana como única fuente de luz"
  },
  {
    "id": "photo-3",
    "filename": "photo-3.jpg",
    "width": 2500,
    "height": 2500,
    "alt": "Arquitectura moderna con líneas geométricas",
    "title": "Geometría Urbana"
  }
]
```

**Consejos para el alt text:**
- Describe qué se ve en la foto
- Incluye detalles importantes (colores, composición, ambiente)
- Piensa en alguien que no puede verla
- Importante para SEO y accesibilidad

### 4.3 Plantilla para copiar y rellenar

```json
{
  "id": "photo-X",
  "filename": "photo-X.jpg",
  "width": 0000,
  "height": 0000,
  "alt": "Descripción detallada de la foto",
  "title": "Título de la Foto",
  "description": "Historia o contexto opcional"
}
```

---

## Fase 5: Crear el componente PhotoGallery

### 5.1 Componente básico con AVIF/WebP automático

Crea `src/components/PhotoGallery.astro`:

```astro
---
import { Image } from 'astro:assets';
import type { Photo, PhotoWithRatio } from '../types/photo';
import photosMetadata from '../content/photos/metadata.json';

// Importar dinámicamente todas las imágenes JPG de la carpeta photos
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg}', {
  eager: true
});

// Procesar metadata y combinar con las imágenes importadas
const photos: PhotoWithRatio[] = photosMetadata.map((photo: Photo) => {
  const imagePath = `../assets/photos/${photo.filename}`;
  const imageModule = images[imagePath];

  if (!imageModule) {
    console.warn(`⚠️ Imagen no encontrada: ${photo.filename}`);
    return null;
  }

  return {
    ...photo,
    aspectRatio: photo.width / photo.height,
    src: imageModule.default,
  };
}).filter(Boolean) as PhotoWithRatio[];

console.log(`✓ ${photos.length} fotos cargadas`);
---

<section class="w-full px-4 sm:px-6 lg:px-8 py-8" aria-label="Galería de fotografías">
  <h1 class="sr-only">Portfolio Fotográfico</h1>

  <!-- Grid Masonry con Tailwind CSS Columns -->
  <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
    {photos.map((photo) => (
      <div
        class="break-inside-avoid mb-4 group cursor-pointer"
        data-photo-id={photo.id}
      >
        <div class="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            format="avif"
            fallbackFormat="webp"
            class="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-105"
            style={`aspect-ratio: ${photo.aspectRatio}`}
          />
        </div>
      </div>
    ))}
  </div>
</section>
```

### 5.2 Explicación detallada del código

**Sección de script (---):**

```typescript
import { Image } from 'astro:assets';
```
Importa el componente optimizador de imágenes de Astro.

```typescript
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg}', {
  eager: true
});
```
- Busca todos los JPG en la carpeta photos
- `eager: true`: Los carga inmediatamente (necesario para build)
- Solo JPG porque esos son tus exports de Lightroom

```typescript
aspectRatio: photo.width / photo.height,
```
Calcula la proporción (ej: 2500/1667 = 1.5). Esto previene que la página "salte" al cargar imágenes.

**HTML - El Container:**

```astro
<section class="w-full px-4 sm:px-6 lg:px-8 py-8">
```
- `w-full`: Ancho completo (100% del viewport)
- `px-4`: 16px de padding horizontal en móvil
- `sm:px-6`: 24px en tablet (640px+)
- `lg:px-8`: 32px en laptop (1024px+)
- `py-8`: 32px de padding vertical arriba y abajo

```astro
<div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
```
**Masonry con CSS Columns:**
- `columns-1`: 1 columna en móvil (<640px)
- `sm:columns-2`: 2 columnas en tablet (640px+)
- `lg:columns-3`: 3 columnas en laptop (1024px+)
- `xl:columns-4`: 4 columnas en desktop grande (1280px+)
- `gap-4`: 16px de espacio entre columnas

**HTML - Cada Foto:**

```astro
<div class="break-inside-avoid mb-4 group cursor-pointer">
```
- `break-inside-avoid`: Evita que la imagen se corte entre columnas
- `mb-4`: 16px de margen inferior (separación vertical)
- `group`: Permite efectos hover coordinados (foto + sombra)
- `cursor-pointer`: Muestra cursor de mano (preparado para lightbox)

```astro
<div class="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
```
- `relative`: Contexto para posicionamiento absoluto (futuro lightbox)
- `overflow-hidden`: Recorta el zoom para que no se salga
- `rounded-lg`: Bordes redondeados (8px)
- `shadow-md`: Sombra mediana
- `hover:shadow-2xl`: Sombra muy intensa al hover
- `transition-shadow duration-300`: Transición suave de 300ms

**El componente Image:**

```astro
<Image
  src={photo.src}
  format="avif"
  fallbackFormat="webp"
  ...
/>
```
- `format="avif"`: Astro genera AVIF como formato principal
- `fallbackFormat="webp"`: Si el navegador no soporta AVIF, usa WebP
- Si no soporta ninguno, usa el JPG original

```astro
class="... group-hover:scale-105"
```
- `scale-105`: Agranda la imagen al 105% (zoom suave)
- `group-hover:`: Se activa cuando el mouse está sobre el contenedor padre

```astro
style={`aspect-ratio: ${photo.aspectRatio}`}
```
- Fuerza la proporción correcta
- Previene "Layout Shift" (mejora Core Web Vitals)
- El navegador reserva el espacio antes de cargar la imagen

---

## Fase 6: Integrar en la página principal

### 6.1 Actualizar index.astro

Edita `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import PhotoGallery from '../components/PhotoGallery.astro';
---

<Layout title="Portfolio Fotográfico">
  <PhotoGallery />
</Layout>
```

**Así de simple.** Astro hace que componer componentes sea muy fácil.

---

## Fase 7: Verificar que funciona

### 7.1 Levantar el servidor de desarrollo

```bash
npm run dev
```

Deberías ver algo como:
```
  🚀  astro  v5.16.2 started in XXms

  ┃ Local    http://localhost:4321/
  ┃ Network  use --host to expose
```

Abre tu navegador en `http://localhost:4321`

### 7.2 Checklist de verificación inicial

- [ ] ¿Ves todas las imágenes del metadata.json?
- [ ] ¿Las imágenes mantienen sus proporciones originales?
- [ ] ¿El layout masonry se distribuye bien?
- [ ] ¿No hay espacios en blanco raros?

### 7.3 Si algo no funciona

**Error: "Imagen no encontrada"**
- Verifica que `filename` en metadata.json coincida EXACTAMENTE con el archivo
- Revisa mayúsculas/minúsculas: `Photo-1.jpg` ≠ `photo-1.jpg`

**Las imágenes se ven distorsionadas**
- Verifica que width y height en metadata.json sean correctos
- Usa las dimensiones reales del archivo JPG exportado

**No aparece nada**
- Abre la consola del navegador (F12)
- Mira si hay errores en rojo
- Verifica que el archivo metadata.json sea JSON válido (puedes usar JSONLint.com)

---

## Fase 8: Verificar la conversión AVIF/WebP

### 8.1 Hacer un build de producción

```bash
npm run build
```

Esto genera las versiones optimizadas. Verás algo como:
```
Building for production...
✓ Completed in XXXms.

  Generating optimized images:
  ▶ src/assets/photos/photo-1.jpg (AVIF, WebP)
  ▶ src/assets/photos/photo-2.jpg (AVIF, WebP)
```

### 8.2 Ver el resultado

```bash
npm run preview
```

Abre `http://localhost:4321` y:

1. Abre DevTools (F12)
2. Ve a la pestaña "Network"
3. Recarga la página (Ctrl+R)
4. Busca tus imágenes

**En navegadores modernos verás:**
- Archivos `.avif` (Chrome, Edge, Firefox, Safari 16+)
- Peso: ~60% menos que el JPG original

**En navegadores antiguos:**
- Archivos `.webp` o `.jpg` según soporte

### 8.3 Comparación de pesos (ejemplo)

| Archivo original | JPG 90% | WebP | AVIF |
|-----------------|---------|------|------|
| 2500×1667px     | 5.2 MB  | 3.1 MB | 2.1 MB |
| Ahorro          | -       | 40%  | 60% |

**Resultado:** Página carga 60% más rápido sin perder calidad visual ni colores.

---

## Fase 9: Ajustar el padding y espaciado

### 9.1 Personalizar el padding del container

En `PhotoGallery.astro`, línea del `<section>`:

```astro
<!-- Configuración actual (moderada) -->
<section class="w-full px-4 sm:px-6 lg:px-8 py-8">

<!-- Alternativa: Más padding (aire) -->
<section class="w-full px-6 sm:px-10 lg:px-16 py-12">

<!-- Alternativa: Menos padding (más fotos en pantalla) -->
<section class="w-full px-2 sm:px-4 lg:px-6 py-4">

<!-- Alternativa: Sin padding lateral (edge to edge) -->
<section class="w-full px-0 py-8">
```

**Experimenta** cambiando los valores y recargando el navegador.

### 9.2 Ajustar el espacio entre fotos

**Gap entre columnas** (horizontal):
```astro
<!-- Actual -->
<div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">

<!-- Más espacio -->
<div class="... gap-6"> <!-- 24px -->
<div class="... gap-8"> <!-- 32px -->

<!-- Menos espacio -->
<div class="... gap-2"> <!-- 8px -->
<div class="... gap-1"> <!-- 4px -->
```

**Margen entre filas** (vertical):
```astro
<!-- Actual -->
<div class="break-inside-avoid mb-4 group cursor-pointer">

<!-- Más espacio -->
<div class="... mb-6"> <!-- 24px -->
<div class="... mb-8"> <!-- 32px -->

<!-- Menos espacio -->
<div class="... mb-2"> <!-- 8px -->
```

**Tip:** Mantén `gap-X` y `mb-X` con el mismo número para espaciado uniforme.

### 9.3 Presets de espaciado

**Minimalista (apretado):**
```astro
gap-2 mb-2  <!-- 8px entre fotos -->
```

**Estándar (equilibrado):**
```astro
gap-4 mb-4  <!-- 16px entre fotos -->
```

**Espacioso (aire):**
```astro
gap-6 mb-6  <!-- 24px entre fotos -->
```

**Magazine (muy espacioso):**
```astro
gap-8 mb-8  <!-- 32px entre fotos -->
```

---

## Fase 10: Ajustar el número de columnas

### 10.1 Presets según estilo

**Muchas columnas (grid denso):**
```astro
<div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-3">
```
Bueno para: Muchas fotos, estilos dinámicos, portfolios extensos

**Columnas moderadas (equilibrado):**
```astro
<div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
```
Bueno para: Portfolio general, fácil de ver las fotos

**Pocas columnas (minimalista):**
```astro
<div class="columns-1 sm:columns-2 lg:columns-3 gap-6">
```
Bueno para: Portfolios artísticos, fotos grandes, protagonismo

**Muy minimalista (editorial):**
```astro
<div class="columns-1 md:columns-2 gap-8">
```
Bueno para: Portfolios selectos, proyectos específicos, foto de autor

### 10.2 Breakpoints de Tailwind

Para que entiendas los tamaños:

| Clase | Ancho mínimo | Dispositivo típico |
|-------|--------------|-------------------|
| (sin prefijo) | 0px | Móvil pequeño |
| `sm:` | 640px | Móvil grande / Tablet pequeña |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Desktop grande |

---

## Fase 11: Personalizar efectos hover

### 11.1 Zoom actual (suave)

```astro
class="... group-hover:scale-105"
```

### 11.2 Alternativas de zoom

```astro
<!-- Zoom más sutil -->
class="... group-hover:scale-[1.02]"

<!-- Zoom más intenso -->
class="... group-hover:scale-110"

<!-- Zoom muy dramático -->
class="... group-hover:scale-125"

<!-- Sin zoom -->
class="..."  <!-- Elimina el group-hover:scale-* -->
```

### 11.3 Ajustar velocidad de transición

```astro
<!-- Actual (medio) -->
class="... transition-transform duration-500 ease-out"

<!-- Más rápido (snappy) -->
class="... transition-transform duration-200 ease-out"

<!-- Más lento (suave) -->
class="... transition-transform duration-700 ease-out"

<!-- Muy lento (cinematográfico) -->
class="... transition-transform duration-1000 ease-in-out"
```

### 11.4 Combinar con otros efectos

**Brightness + zoom:**
```astro
class="... group-hover:scale-105 group-hover:brightness-110"
```

**Saturación + zoom:**
```astro
class="... group-hover:scale-105 group-hover:saturate-150"
```

**Blur al hover (efecto artístico):**
```astro
class="... transition-all duration-500 group-hover:scale-105 group-hover:blur-[2px]"
```

---

## Fase 12: Testing y refinamiento

### 12.1 Probar en diferentes viewports

Abre DevTools (F12) > Toggle device toolbar (Ctrl+Shift+M)

Prueba estos tamaños:

| Dispositivo | Ancho | Columnas esperadas |
|-------------|-------|-------------------|
| iPhone SE | 375px | 1 |
| iPhone 12/13 | 390px | 1 |
| iPad Mini | 768px | 2-3 |
| iPad Pro | 1024px | 3 |
| Laptop | 1280px | 4 |
| Desktop | 1920px | 4-5 |

**Qué verificar:**
- [ ] Las fotos se ven completas (no cortadas)
- [ ] El espaciado se ve equilibrado
- [ ] El hover funciona suavemente
- [ ] No hay saltos al cargar las imágenes

### 12.2 Performance check con Lighthouse

1. Abre DevTools (F12)
2. Ve a la pestaña "Lighthouse"
3. Selecciona:
   - ✓ Performance
   - ✓ Accessibility
   - ✓ Best Practices
   - ✓ SEO
4. Clic en "Analyze page load"

**Objetivos a alcanzar:**
- Performance: >90
- Accessibility: >90
- Best Practices: >95
- SEO: >90

**Si Performance <90:**
- Verifica que todas las imágenes tengan `loading="lazy"`
- Confirma que `aspect-ratio` está aplicado
- Revisa que las imágenes tengan atributos `width` y `height`

### 12.3 Core Web Vitals

**LCP (Largest Contentful Paint):** <2.5s
- Asegúrate de que la primera imagen visible tenga `loading="eager"` (opcional)

**CLS (Cumulative Layout Shift):** <0.1
- El `aspect-ratio` debería prevenir esto automáticamente

**FID (First Input Delay):** <100ms
- Por ahora no hay JS, así que debería ser perfecto

---

## Fase 13: Optimizaciones avanzadas (opcional)

### 13.1 Priorizar la primera imagen

En `PhotoGallery.astro`, modifica el map:

```astro
{photos.map((photo, index) => (
  <div class="...">
    <div class="...">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={index < 3 ? "eager" : "lazy"}
        format="avif"
        fallbackFormat="webp"
        class="..."
        style={`aspect-ratio: ${photo.aspectRatio}`}
      />
    </div>
  </div>
))}
```

Esto carga las primeras 3 imágenes inmediatamente y el resto lazy.

### 13.2 Agregar bordes redondeados personalizados

```astro
<!-- Bordes más redondeados -->
<div class="... rounded-xl">  <!-- 12px -->
<div class="... rounded-2xl"> <!-- 16px -->

<!-- Bordes cuadrados -->
<div class="... rounded-none">

<!-- Bordes solo arriba -->
<div class="... rounded-t-lg">
```

### 13.3 Añadir un overlay sutil en hover

En `PhotoGallery.astro`, dentro del div con la imagen:

```astro
<div class="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
  <!-- Overlay oscuro al hover -->
  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10 pointer-events-none"></div>

  <Image ... />
</div>
```

Esto añade un overlay negro semitransparente al hacer hover (efecto elegante).

---

## Fase 14: Preparar para Lightbox (próximo paso)

El lightbox será una fase aparte que incluirá:

1. **Modal fullscreen** al hacer clic en una foto
2. **Navegación** entre fotos (flechas o swipe)
3. **Cerrar** con ESC, clic fuera, o botón X
4. **Animaciones** de apertura/cierre
5. **Metadata visible** (título, descripción)
6. **Zoom in/out** dentro del lightbox (avanzado)

Esto requiere JavaScript y lo haremos paso a paso cuando completes esta fase.

---

## Resumen de archivos creados

| Archivo | Descripción | Estado |
|---------|-------------|---------|
| `src/types/photo.ts` | Tipos TypeScript | ✓ Crear |
| `src/content/photos/metadata.json` | Metadata de fotos | ✓ Crear |
| `src/components/PhotoGallery.astro` | Grid masonry | ✓ Crear |
| `src/pages/index.astro` | Página principal | ✓ Actualizar |
| `src/assets/photos/*.jpg` | Fotos de Lightroom | ✓ Exportar |

---

## Comandos útiles

```bash
# Desarrollo local (hot reload automático)
npm run dev

# Build de producción (genera AVIF/WebP)
npm run build

# Vista previa del build
npm run preview

# Ver tamaño del build
npm run build && dir dist /s
```

---

## Checklist final antes de pasar al Lightbox

- [ ] Exportaste al menos 5 fotos desde Lightroom (JPG, 85-90%, sRGB, 2500px)
- [ ] Todas las fotos están en `src/assets/photos/`
- [ ] Creaste `metadata.json` con todas las fotos
- [ ] El grid masonry se ve bien en móvil, tablet y desktop
- [ ] El efecto hover funciona suavemente
- [ ] Lighthouse Performance >85
- [ ] No hay errores en la consola del navegador

---

## Solución de problemas comunes

### Las imágenes se ven borrosas

**Causa:** Dimensiones incorrectas en metadata.json
**Solución:** Verifica que width/height coincidan con el JPG exportado

### El grid se ve desordenado

**Causa:** Aspect ratios inconsistentes o faltantes
**Solución:** Asegúrate de que todas las fotos tengan aspect-ratio calculado

### Las imágenes tardan mucho en cargar

**Causa:** Estás en modo desarrollo (`npm run dev`)
**Solución:** Haz un build (`npm run build`) para ver las optimizaciones reales

### Espacios en blanco extraños

**Causa:** `break-inside-avoid` no funciona en algunos navegadores antiguos
**Solución:** Agrega `page-break-inside: avoid` en CSS personalizado si es necesario

### Las imágenes no se convierten a AVIF

**Causa:** El componente `<Image>` necesita parámetros correctos
**Solución:** Verifica que tengas `format="avif"` y `fallbackFormat="webp"`

---

## Conceptos clave aprendidos

✓ **Lightroom → Web:** JPG en sRGB es perfecto, Astro hace la conversión a formatos modernos

✓ **AVIF vs JPG:** Mismo espacio de color, 60% menos peso

✓ **CSS Columns:** Forma simple y performante de hacer masonry (aunque ordena por columnas, no por altura)

✓ **aspect-ratio:** Previene layout shift y mejora Core Web Vitals

✓ **Lazy loading:** Solo carga imágenes visibles, mejora tiempo de carga inicial

✓ **srcset automático:** Astro genera múltiples tamaños, el navegador elige el óptimo

---

## Recursos útiles

- [Astro Docs: Images](https://docs.astro.build/en/guides/images/)
- [Tailwind CSS: Columns](https://tailwindcss.com/docs/columns)
- [AVIF Browser Support](https://caniuse.com/avif)
- [Web.dev: Optimize Images](https://web.dev/fast/#optimize-your-images)
- [Adobe: sRGB vs Display P3](https://helpx.adobe.com/photoshop/using/color-settings.html)

---

## Próximos pasos (futuras guías)

1. **Lightbox modal** con navegación y animaciones
2. **Filtros por categoría** (paisajes, retratos, arquitectura, etc.)
3. **Infinite scroll** o paginación
4. **Preloading inteligente** de siguiente imagen
5. **Transiciones de página** con View Transitions API
6. **Admin panel** para subir fotos sin editar código

---

## Notas importantes

- **Guarda cambios frecuentemente** (Git commits regulares)
- **No optimices prematuramente:** Primero que funcione, luego optimiza
- **Experimenta:** Cambia valores, rompe cosas, aprende
- **Pregunta:** Si algo no funciona o no entiendes, pregunta

---

**¿Listo para empezar?**

Comienza por la **Fase 1** y sigue cada paso en orden. No te saltes fases porque cada una construye sobre la anterior.

**Si tienes dudas en cualquier paso, pregunta antes de continuar.**

¡Éxito con tu portfolio fotográfico!
