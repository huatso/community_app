// app/data/mockData.ts
import { 
  Event, 
  Service, 
  HealthTip, 
  HomeData, 
  EmergencyContact 
} from './types';

// 生成社区活动数据
export const generateDemoEvents = (): Event[] => {
  return [
    {
      id: '1',
      title: 'Dança na Praça - Grupo de Idosos',
      description: 'Encontro semanal para dança de salão e atividades físicas leves',
      location: 'Praça da República - Centro',
      event_date: '2024-11-15T19:00:00',
      category: 'Dança',
      created_by: {
        name: 'Carlos Silva',
        avatar_url: null
      },
      participants: 12,
      max_participants: 20,
      comments: [
        {
          id: '1',
          user_name: 'Maria Oliveira',
          content: 'Adoro esses encontros! Sempre muito divertido.',
          created_at: '2024-11-10T14:30:00'
        },
        {
          id: '2',
          user_name: 'João Santos',
          content: 'Vou levar minha esposa desta vez!',
          created_at: '2024-11-10T16:45:00'
        }
      ]
    },
    {
      id: '2',
      title: 'Clube de Leitura - Literatura Brasileira',
      description: 'Discussão mensal sobre obras clássicas da literatura nacional',
      location: 'Biblioteca Municipal',
      event_date: '2024-11-20T15:00:00',
      category: 'Cultura',
      created_by: {
        name: 'Ana Costa',
        avatar_url: null
      },
      participants: 8,
      max_participants: 15,
      comments: [
        {
          id: '1',
          user_name: 'Pedro Almeida',
          content: 'Já li o livro, estou ansioso para a discussão!',
          created_at: '2024-11-08T10:15:00'
        }
      ]
    }
    // ... 其他活动数据
  ];
};

// 生成服务数据
export const generateDemoServices = (): Service[] => {
  return [
    {
      id: '1',
      title: 'Cuidadora de Idosos Profissional',
      profession: 'Enfermeira Registrada',
      location: 'São Paulo - Centro',
      hourly_rate: 45,
      experience_years: 8,
      rating: 4.9,
      review_count: 32,
      is_verified: true,
      provider: {
        name: 'Ana Santos',
        avatar_url: null
      }
    },
    {
      id: '2',
      title: 'Acompanhamento Diário',
      profession: 'Cuidadora',
      location: 'Rio de Janeiro - Copacabana',
      hourly_rate: 35,
      experience_years: 3,
      rating: 4.7,
      review_count: 18,
      is_verified: true,
      provider: {
        name: 'Carla Oliveira',
        avatar_url: null
      }
    }
    // ... 其他服务数据
  ];
};

// 生成健康小贴士
export const generateHealthTips = (): HealthTip[] => {
  return [
    {
      id: '1',
      title: 'Importância da Hidratação',
      content: 'Beba pelo menos 8 copos de água por dia. A hidratação adequada ajuda no funcionamento dos rins e na regulação da pressão arterial.',
      category: 'Saúde Básica',
      read_time: 2,
      created_at: '2024-11-10T08:00:00'
    },
    {
      id: '2',
      title: 'Caminhada Diária',
      content: 'Caminhar 30 minutos por dia fortalece os músculos, melhora a circulação e ajuda a manter a saúde cardiovascular.',
      category: 'Exercício',
      read_time: 3,
      created_at: '2024-11-09T10:30:00'
    },
    {
      id: '3',
      title: 'Alimentação Balanceada',
      content: 'Inclua frutas, verduras e legumes em todas as refeições. Evite alimentos processados e com excesso de sal.',
      category: 'Nutrição',
      read_time: 4,
      created_at: '2024-11-08T14:15:00'
    }
  ];
};

// 生成紧急联系人
export const generateEmergencyContacts = (): EmergencyContact[] => {
  return [
    {
      id: '1',
      name: 'SAMU',
      phone: '192',
      type: 'emergency',
      description: 'Serviço de Atendimento Móvel de Urgência'
    },
    {
      id: '2',
      name: 'Bombeiros',
      phone: '193',
      type: 'emergency',
      description: 'Corpo de Bombeiros Militar'
    },
    {
      id: '3',
      name: 'Polícia',
      phone: '190',
      type: 'emergency',
      description: 'Polícia Militar'
    },
    {
      id: '4',
      name: 'Filha - Maria',
      phone: '+5511999999999',
      type: 'family',
      description: 'Contato familiar direto'
    }
  ];
};

// 生成首页数据
export const generateHomeData = (): HomeData => {
  return {
    featuredServices: generateDemoServices().slice(0, 2),
    upcomingEvents: generateDemoEvents().slice(0, 2),
    healthTips: generateHealthTips().slice(0, 3),
    emergencyContacts: generateEmergencyContacts()
  };
};

// 导出所有数据
export default {
  events: generateDemoEvents(),
  services: generateDemoServices(),
  healthTips: generateHealthTips(),
  emergencyContacts: generateEmergencyContacts(),
  homeData: generateHomeData()
};