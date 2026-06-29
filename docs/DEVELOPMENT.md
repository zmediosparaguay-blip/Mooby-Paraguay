# Guía de Desarrollo - Mooby Paraguay

## Primeros Pasos

### 1. Clonar el repositorio
```bash
git clone https://github.com/zmediosparaguay-blip/Mooby-Paraguay.git
cd Mooby-Paraguay
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env.local
# Editar .env.local con tus credenciales de Firebase
```

### 4. Iniciar servidor de desarrollo
```bash
npm run dev
# Acceder a http://localhost:3000
```

## Estructura de Componentes

### Componentes de Autenticación
- `components/auth/LoginForm.tsx` - Formulario de login
- `components/auth/RegisterForm.tsx` - Formulario de registro
- `components/auth/VerificationForm.tsx` - Formulario de verificación de identidad

### Componentes del Conductor
- `components/driver/SubscriptionCard.tsx` - Tarjeta de suscripción
- `components/driver/TripHistory.tsx` - Historial de viajes
- `components/driver/DriverProfile.tsx` - Perfil del conductor

### Componentes del Pasajero
- `components/passenger/TripRequest.tsx` - Solicitud de viaje
- `components/passenger/RatingForm.tsx` - Formulario de calificación
- `components/passenger/PaymentMethod.tsx` - Métodos de pago

## Servicios Disponibles

### driverService
- `getDriver(driverId)` - Obtener datos del conductor
- `createDriver(driverId, data)` - Crear nuevo conductor
- `updateDriver(driverId, data)` - Actualizar conductor
- `getDriversByZone(zone)` - Obtener conductores por zona

### passengerService
- `getPassenger(passengerId)` - Obtener datos del pasajero
- `createPassenger(passengerId, data)` - Crear nuevo pasajero
- `updatePassenger(passengerId, data)` - Actualizar pasajero

### tripService
- `getTrip(tripId)` - Obtener datos del viaje
- `createTrip(tripData)` - Crear nuevo viaje
- `updateTrip(tripId, data)` - Actualizar viaje
- `getDriverTrips(driverId)` - Obtener viajes del conductor

### subscriptionService
- `getSubscription(subscriptionId)` - Obtener suscripción
- `createSubscription(data)` - Crear suscripción
- `getDriverSubscription(driverId)` - Obtener suscripción del conductor
- `renewSubscription(id, endDate)` - Renovar suscripción

### identityService
- `uploadDocument(userId, file, type)` - Subir documento de identidad
- `createVerification(data)` - Crear verificación
- `verifyIdentity(verificationId, isVerified)` - Verificar identidad

### securityService
- `isHighRiskZone(zone)` - Verificar si es zona de alto riesgo
- `isPaymentMethodAllowed(method, zone)` - Verificar método de pago
- `validateCedulaFormat(cedula)` - Validar formato de cédula
- `validateEmail(email)` - Validar email
- `validatePhoneNumber(phone)` - Validar número de teléfono

## Convenciones de Código

### Naming
- Componentes: PascalCase (e.g., `LoginForm.tsx`)
- Funciones/variables: camelCase (e.g., `getUserData`)
- Constantes: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
- Tipos: PascalCase (e.g., `interface User`)

### Organización
- Imports en orden: React -> Next -> Third-party -> Local
- Funciones definidas antes de ser usadas
- Error handling en todos los servicios
- Logging para debugging

## Testing

```bash
npm run test
npm run test:watch
```

## Deployment

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### Firebase Hosting
```bash
firebase deploy
```
