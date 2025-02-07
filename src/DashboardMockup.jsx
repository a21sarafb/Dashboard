import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

// Datos de evolución de sesiones (línea)
const dataSessions = [
  { name: "Nov", sessions: 90000 },
  { name: "Dic", sessions: 110000 },
  { name: "Ene", sessions: 120000 },
];

// Datos de distribución de canales (torta)
const dataChannels = [
  { name: "Orgánico", value: 50 },
  { name: "Directo", value: 20 },
  { name: "Social", value: 15 },
  { name: "Referencias", value: 10 },
  { name: "Pago", value: 5 },
];

// Colores para el gráfico de torta
const colors = ["#DA291C", "#FFCC00", "#005BBB", "#6D6E71", "#CCCCCC"];

// Datos de visitas por país (barras)
const dataCountries = [
  { country: "España", visits: 60 },
  { country: "Francia", visits: 10 },
  { country: "UK", visits: 8 },
  { country: "Alemania", visits: 7 },
  { country: "Otros", visits: 15 },
];

// Datos para KPIs con mini-gráficas (valor anterior vs. actual)
const kpiData = [
  {
    title: "Sesiones",
    previous: 108000, // Valor anterior
    current: 120000,  // Valor actual
    difference: "+10%",
  },
  {
    title: "Usuarios Únicos",
    previous: 89286,
    current: 100000,
    difference: "+12%",
  },
  {
    title: "Tasa de Rebote",
    previous: 40,  // % anterior
    current: 35,   // % actual
    difference: "-5%",
    isPercentage: true,
  },
  {
    title: "Conversiones Totales",
    previous: 2174,
    current: 2500,
    difference: "+15%",
  },
];

export default function DashboardMockup() {
  return (
    <div className="bg-white min-h-screen">
      {/* Contenedor centrado */}
      <div className="max-w-[1280px] mx-auto px-8 py-6">
        {/* Encabezado con logo y título */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Logo (placeholder) */}
            <img
              src="https://identitatcorporativa.gencat.cat/web/.content/Documentacio/descarregues/dpt/COLOR/Empresa/act_h3.png"
              alt="Generalitat de Catalunya"
              className="h-12 object-contain"
            />
            <h1 className="text-3xl font-extrabold text-[#DA291C] tracking-wide drop-shadow-sm">
              DASHBOARD
            </h1>
          </div>
          <div className="flex gap-4">
            <select className="border border-gray-300 px-4 py-2 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow">
              <option>23/05/2023</option>
              <option>16/07/2023</option>
            </select>
            <select className="border border-gray-300 px-4 py-2 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow">
              <option>Región 1</option>
              <option>Región 2</option>
            </select>
          </div>
        </div>

        {/* KPIs con mini-gráficas */}
        <div className="grid grid-cols-4 gap-6">
          {kpiData.map((kpi, idx) => {
            // Datos del BarChart para cada KPI
            const barData = [
              { name: "Anterior", value: kpi.previous },
              { name: "Actual", value: kpi.current },
            ];

            // Formateo de etiqueta (para %, si aplica)
            const labelFormatter = (val) =>
              kpi.isPercentage ? `${val}%` : val.toString();

            return (
              <div
                key={idx}
                className="bg-white p-4 shadow-xl rounded-xl border border-gray-100 flex flex-col items-center hover:scale-[1.02] transition-transform"
              >
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  {kpi.title}
                </h2>
                <div className="w-full h-[120px]">
                  <ResponsiveContainer>
                    <BarChart data={barData}>
                      <XAxis dataKey="name" stroke="#6D6E71" fontSize={12} />
                      <YAxis stroke="#6D6E71" fontSize={12} />
                      <Tooltip formatter={(val) => [labelFormatter(val)]} />
                      <Bar
                        dataKey="value"
                        fill="#DA291C"
                        barSize={25}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Variación: <span className="font-bold">{kpi.difference}</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Sección de Gráficos */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          {/* Gráfico de Sesiones (línea) */}
          <div className="bg-white p-6 shadow-xl rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Evolución de Sesiones
            </h2>
            <div className="w-full h-[250px]">
              <ResponsiveContainer>
                <LineChart data={dataSessions}>
                  <XAxis dataKey="name" stroke="#6D6E71" />
                  <YAxis stroke="#6D6E71" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="#DA291C"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Canales (torta) */}
          <div className="bg-white p-6 shadow-xl rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Distribución de Canales
            </h2>
            <div className="w-full h-[250px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={dataChannels}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                  >
                    {dataChannels.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Gráfico de Visitas por País (barras) */}
        <div className="bg-white p-6 shadow-xl rounded-xl mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Visitas por País
          </h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <BarChart data={dataCountries}>
                <XAxis dataKey="country" stroke="#6D6E71" fontSize={12} />
                <YAxis stroke="#6D6E71" fontSize={12} />
                <Tooltip />
                <Bar
                  dataKey="visits"
                  fill="#005BBB"
                  barSize={40}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
