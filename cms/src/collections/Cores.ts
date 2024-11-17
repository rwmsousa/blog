import { CollectionConfig } from 'payload/types';
import { colorPickerField } from '@innovixx/payload-color-picker-field';
import admins from './access/admins';
import adminsAndUser from './access/adminsAndUser';

export const Cores: CollectionConfig = {
  slug: 'cores',
  labels: {
    singular: 'Cor',
    plural: 'Cores',
  },
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['id', 'nome', 'referencia', 'hex', 'updatedAt'],
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
      type: 'row',
      fields: [
        {
          name: 'nome',
          label: 'Nome da Cor',
          type: 'text',
          required: true,
          admin: {
            description: {
              value: 'Ex.: Primária.',
            },
            width: '20%',
          },
          access: {
            update: admins,
          },
        },
        colorPickerField({
          name: 'hex',
          label: 'Cor',
          required: true,
          admin: {
            width: '20%',
          },
        }),
        {
          name: 'referencia',
          label: 'Referência',
          type: 'text',
          required: false,
          admin: {
            description: {
              value:
                'Referência de localização de onde utilizar a cor. Ex.: Rodapé, Cabeçalho, etc.',
            },
            width: '60%',
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
