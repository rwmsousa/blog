import { CollectionConfig } from 'payload/types';
import admins from './access/admins';
import adminsAndUser from './access/adminsAndUser';

export const Sedes: CollectionConfig = {
  slug: 'sedes',
  labels: {
    singular: 'Sede',
    plural: 'Sedes',
  },
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['id', 'nome', 'endereco', 'cidade', 'estado', 'updatedAt'],
  },
  defaultSort: 'updatedAt',
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        if (req.user) {
          data.lastModifiedBy = req.user.id;
          data.lastModifiedById = req.user.id;
        }
        data.lastModifiedAt = new Date().toISOString();

        if (data.lastModifiedAt) {
          const date = new Date(data.lastModifiedAt);
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
          data.lastModifiedDisplay = `${req.user.name} ${req.user.lastname} - ${formattedDate}`;
        }

        return data;
      },
    ],
   
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'nome',
          label: 'Nome da Sede',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
          access: {
            update: admins,
          },
        },
        {
          name: 'endereco',
          label: 'Endereço',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'numero',
          label: 'Número',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'bairro',
          label: 'Bairro',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'complemento',
          label: 'Complemento',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'cidade',
          label: 'Cidade',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'estado',
          label: 'Estado',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'cep',
          label: 'CEP',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'googleMaps',
          label: 'Google Maps',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'horario',
          label: 'Horário de Funcionamento',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'telefone',
          label: 'Telefone',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'site',
          label: 'Site',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'facebook',
          label: 'Facebook',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'instagram',
          label: 'Instagram',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'linkedin',
          label: 'Linkedin',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'youtube',
          label: 'Youtube',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'twitter',
          label: 'Twitter',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'whatsapp',
          label: 'Whatsapp',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'telegram',
          label: 'Telegram',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'tiktok',
          label: 'Tiktok',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'skype',
          label: 'Skype',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'missao',
          label: 'Missão',
          type: 'textarea',
          required: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'visao',
          label: 'Visão',
          type: 'textarea',
          required: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'valores',
          label: 'Valores',
          type: 'textarea',
          required: false,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'lastModifiedBy',
      type: 'relationship',
      relationTo: 'usuarios',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'lastModifiedById',
      type: 'number',
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      name: 'lastModifiedAt',
      type: 'date',
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      name: 'lastModifiedDisplay',
      label: 'Última modificação',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  access: {
    read: () => true,
    create: adminsAndUser,
    update: adminsAndUser,
    delete: admins,
  },
};
