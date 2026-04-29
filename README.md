# Travel Dashboard

Un dashboard web simple para viajes que permite seleccionar una ciudad y obtener información sobre el clima y conversión de moneda.

## Descripción

Esta aplicación web muestra información útil para viajeros:
- Información básica de la ciudad seleccionada
- Clima actual (temperatura y probabilidad de lluvia)
- Mensaje de recomendación basado en la temperatura
- Conversión de euros (EUR) a la moneda local de la ciudad

## Características

- Selección de ciudades predefinidas: Barcelona, London, Paris, New York, Tokyo
- Integración con API de clima (Open-Meteo)
- Conversión de moneda en tiempo real (ExchangeRate-API)
- Interfaz responsiva y moderna

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- APIs externas:
  - [Open-Meteo](https://open-meteo.com/) para datos meteorológicos
  - [ExchangeRate-API](https://exchangerate-api.com/) para tasas de cambio

## Cómo Usar

1. Abre `index.html` en tu navegador web.
2. Selecciona una ciudad del menú desplegable.
3. La información del clima se cargará automáticamente.
4. Ingresa una cantidad en euros y haz clic en "Convertir" para ver la conversión a la moneda local.

## Estructura del Proyecto

- `index.html`: Estructura principal de la página
- `main.js`: Lógica de JavaScript para funcionalidades
- `style.css`: Estilos CSS para la interfaz

## Dependencias

No requiere instalación de dependencias. Solo necesita un navegador moderno con soporte para JavaScript y Fetch API.

## APIs Externas

La aplicación utiliza APIs gratuitas:
- Open-Meteo: No requiere clave API
- ExchangeRate-API: No requiere clave API (versión gratuita)

Nota: Si se supera el límite de uso gratuito de las APIs, podría requerir registro para obtener claves API.

## Compatibilidad

Compatible con navegadores modernos que soporten:
- ES6+
- Fetch API
- async/await

## Contribución

Para contribuir:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

Este proyecto es de código abierto. Consulta el archivo LICENSE para más detalles.