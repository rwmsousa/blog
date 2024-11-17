import { CollectionConfig } from 'payload/types';
import admins from './access/admins';
import adminsAndUser from './access/adminsAndUser';

export const Textos: CollectionConfig = {
  slug: 'textos',
  labels: {
    singular: 'Texto',
    plural: 'Textos',
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
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['id', 'titulo', 'texto', 'updatedAt'],
    group: 'Componentes',
  },
  defaultSort: 'updatedAt',
  fields: [
    {
      name: 'titulo',
      label: 'Título',
      type: 'text',
      required: true,
      access: {
        update: admins,
      },
    },
    {
      name: 'conteudo',
      label: 'Conteúdo',
      type: 'textarea',
      required: true,
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
