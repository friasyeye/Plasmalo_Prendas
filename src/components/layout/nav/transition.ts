/**
 * Duración y curva COMPARTIDAS por el fondo del navbar y el mega-menú.
 *
 * Ambos cambian en el mismo render (al hacer hover); con la misma transición
 * aparecen exactamente a la vez y no se percibe retardo entre la barra blanca
 * y las imágenes. Cada elemento añade su propio `transition-[...]` con las
 * propiedades que anima.
 */
export const NAV_TRANSITION = "duration-150 ease-out motion-reduce:transition-none";
