import type { CollectionConfig } from 'payload/types';

import admins from './access/admins';
import { protectRoles } from './hooks/protectRoles';
import anyone from './access/anyone';

export const Usuarios: CollectionConfig = {
  slug: 'usuarios',
  labels: {
    singular: 'Usuário',
    plural: 'Usuários',
  },
  auth: {
    tokenExpiration: 604800,
    maxLoginAttempts: 5,
    useAPIKey: true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['id', 'name', 'lastname', 'email', 'roles', 'updatedAt'],
    hidden: ({ user }: { user: any }) => {
      if (!user.roles.toString().includes('admin')) {
        return true;
      }
      return false;
    },
    group: 'Componentes',
  },
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
      name: 'apiKey',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Nome',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'lastname',
          label: 'Sobrenome',
          type: 'text',
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
          name: 'thumbnail',
          label: 'Thumbnail',
          type: 'upload',
          relationTo: 'imagens',
          required: false,
          admin: {
            width: '50%',
            readOnly: false,
          },
        },
        {
          name: 'roles',
          label: 'Acesso',
          type: 'select',
          required: true,
          hasMany: true,
          saveToJWT: true,
          hooks: {
            beforeChange: [protectRoles],
          },
          options: [
            {
              label: 'Admin',
              value: 'admin',
            },
            {
              label: 'Marketing',
              value: 'marketing',
            },
          ],
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
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
};
