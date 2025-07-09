// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const defs = [
    // Fase 1 – Registro de datos
    { questionId: 'full_name', label: 'Nombre completo', fieldType: 'text' },
    { questionId: 'email', label: 'Correo electrónico', fieldType: 'text' },
    { questionId: 'position', label: 'Nombre de la empresa', fieldType: 'text' },

    // Fase 2 – Diagnóstico de capacidades de innovación
    { questionId: 'has_strategy', label: '¿Tiene estrategia de innovación?', fieldType: 'radio', options: ['Sí', 'No'] },
    { questionId: 'has_budget', label: '¿Ha invertido en innovación?', fieldType: 'radio', options: ['Sí', 'No'] },
    { questionId: 'has_team', label: '¿Cuenta con equipo de innovación?', fieldType: 'radio', options: ['Sí', 'No'] },
    { questionId: 'has_projects', label: '¿Colabora con startups o consultoras?', fieldType: 'radio', options: ['Sí', 'No'] },
    { questionId: 'has_evaluation', label: '¿Evalúa impacto periódicamente?', fieldType: 'radio', options: ['Sí', 'No'] },
    { questionId: 'innovation_level', label: 'Nivel de innovación', fieldType: 'radio', options: ['Básico', 'Intermedio', 'Avanzado'] },

    // Fase 3 – Retos identificados
    { questionId: 'challenge_1', label: 'Describa reto 1', fieldType: 'textarea' },
    { questionId: 'challenge_2', label: 'Describa reto 2', fieldType: 'textarea' },
    { questionId: 'challenge_3', label: 'Describa reto 3', fieldType: 'textarea' },

    // Fase 4 – Evaluación de impacto por reto
    // Reto 1
    { questionId: 'impact_profitability_1', label: 'Rentabilidad reto 1', fieldType: 'number' },
    { questionId: 'impact_hr_1', label: 'RRHH reto 1', fieldType: 'number' },
    { questionId: 'impact_health_1', label: 'Salud animal reto 1', fieldType: 'number' },
    { questionId: 'impact_innovation_1', label: 'Innovación reto 1', fieldType: 'number' },
    { questionId: 'impact_production_1', label: 'Producción reto 1', fieldType: 'number' },
    // Reto 2
    { questionId: 'impact_profitability_2', label: 'Rentabilidad reto 2', fieldType: 'number' },
    { questionId: 'impact_hr_2', label: 'RRHH reto 2', fieldType: 'number' },
    { questionId: 'impact_health_2', label: 'Salud animal reto 2', fieldType: 'number' },
    { questionId: 'impact_innovation_2', label: 'Innovación reto 2', fieldType: 'number' },
    { questionId: 'impact_production_2', label: 'Producción reto 2', fieldType: 'number' },
    // Reto 3
    { questionId: 'impact_profitability_3', label: 'Rentabilidad reto 3', fieldType: 'number' },
    { questionId: 'impact_hr_3', label: 'RRHH reto 3', fieldType: 'number' },
    { questionId: 'impact_health_3', label: 'Salud animal reto 3', fieldType: 'number' },
    { questionId: 'impact_innovation_3', label: 'Innovación reto 3', fieldType: 'number' },
    { questionId: 'impact_production_3', label: 'Producción reto 3', fieldType: 'number' },

    // Fase 5 – Plan de acción
    { questionId: 'solution_actions', label: 'Acciones propuestas', fieldType: 'textarea' },
    { questionId: 'existing_solution', label: 'Solución existente', fieldType: 'textarea' },
    { questionId: 'human_resources', label: 'Recursos humanos', fieldType: 'text' },
    { questionId: 'estimated_costs', label: 'Costos estimados', fieldType: 'number' },
    { questionId: 'economic_resources', label: 'Recursos económicos', fieldType: 'number' },
    { questionId: 'implementation_time', label: 'Tiempo de implementación (meses)', fieldType: 'number' },
    { questionId: 'risks', label: 'Riesgos identificados', fieldType: 'textarea' },
    { questionId: 'positive_impact', label: 'Impacto positivo esperado', fieldType: 'textarea' },

    // Fase 6 – KPIs seleccionados (solo Avanzado)
    { questionId: 'kpi_selection', label: 'KPIs seleccionados', fieldType: 'checkbox', options: ['Aumento utilidad', 'Ahorro', 'Crec. ventas', 'Nuevos clientes', 'Automatización', 'Productividad', 'ROI'] },
    { questionId: 'kpi_benefit', label: 'Beneficio esperado (%)', fieldType: 'number' },
    { questionId: 'kpi_savings', label: 'Ahorro esperado (%)', fieldType: 'number' },
    { questionId: 'kpi_sales_growth', label: 'Crecimiento ventas (%)', fieldType: 'number' },
    { questionId: 'kpi_new_clients', label: 'Nuevos clientes', fieldType: 'number' },
    { questionId: 'kpi_automation', label: 'Procesos automatizados', fieldType: 'number' },
    { questionId: 'kpi_productivity', label: 'Productividad (%)', fieldType: 'number' },
    { questionId: 'kpi_roi', label: 'Retorno de inversión (%)', fieldType: 'number' },
  ];

  for (const def of defs) {
    const { questionId, label, fieldType, options } = def;
    await prisma.questionDefinition.upsert({
      where: { questionId },
      update: {
        label,
        fieldType,
        ...(options ? { options } : {})
      },
      create: {
        questionId,
        label,
        fieldType,
        ...(options ? { options } : {})
      },
    });
  }

  console.log(`🌱 Sembradas ${defs.length} preguntas.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
