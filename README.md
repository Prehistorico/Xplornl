XPLORNL
Created by: Prisila Luna Delgado & Stacy Chapa Garza

XPLORNL es una aplicación web diseñada para ayudar a los usuarios a explorar 
lugares turísticos y áreas naturales en Monterrey, Nuevo León. La plataforma 
permite explorar lugares populares, explorar diferentes categorías de atracciones 
y ver información detallada sobre cada ubicación.

Estructura de carpetas:

Backend (contiene modelos y validaciónes de la base de datos junto a otras funciónes internas de la aplicación)
-src
  -config (conexion con mongodb)
  -controllers (validaciónes)
  -middleware (funciónes entre peticiónes y endpoints)
  -models (colecciones de mongodb)
  -routes (endpoints)
  -utils (utilidades)
-server.js (inicialización del puerto y conexion con mongodb)
-app.js (declaración del uso de la app y conexion de rutas)
  
Frontend (código del lado del cliente)
-src
  -assets (recursos usados)
  -components (componentes individuales de cada página)
  -pages (páginas principales)
  -styles (carpeta de css)
-App.jsx (archivo de rutas para las páginas)
