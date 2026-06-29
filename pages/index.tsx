import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Mooby Paraguay - Movilidad Urbana Sostenible</title>
        <meta name="description" content="Plataforma de transporte compartido con modelo de suscripcion innovador" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-indigo-600">🚗 Mooby</div>
                <span className="text-sm text-gray-600">Paraguay</span>
              </div>
              <div className="flex space-x-4">
                <button className="px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded">Login</button>
                <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700">Registrarse</button>
              </div>
            </div>
          </div>
        </nav>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">La Movilidad Urbana Reimaginada</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Mooby revoluciona el transporte compartido en Gran Asuncion con un modelo de suscripcion justo, seguro y eficiente.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                Soy Conductor
              </button>
              <button className="px-8 py-3 bg-white text-indigo-600 font-semibold border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                Soy Pasajero
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Por que Mooby?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ingresos Predecibles</h3>
                <p className="text-gray-600">Suscripcion diaria fija. Sin comisiones variables. Maximiza tus ingresos.</p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="text-3xl mb-4">🛡️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Seguridad Garantizada</h3>
                <p className="text-gray-600">Verificacion de identidad, validacion de cuentas, proteccion contra fraude.</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-4">⚙️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Eficiencia Operativa</h3>
                <p className="text-gray-600">Algoritmo inteligente, menor friccion administrativa, mejor servicio.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
