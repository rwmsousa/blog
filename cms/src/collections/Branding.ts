import { CollectionConfig, Field } from 'payload/types';
import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import admins from './access/admins';
import adminsAndUser from './access/adminsAndUser';

const tags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'a',
  'span',
  'div',
  'button',
  'label',
  'input',
  'select',
  'option',
];
export const Branding: CollectionConfig = {
  slug: 'branding',
  labels: {
    singular: 'Branding',
    plural: 'Branding',
  },
  admin: {
    useAsTitle: 'branding',
    defaultColumns: ['id', 'branding', 'updatedAt'],
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
      name: 'branding',
      label: 'Branding',
      type: 'text',
      required: true,
      access: {
        update: admins,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'imagens',
          type: 'array',
          label: 'Imagens',
          labels: {
            singular: 'Imagem',
            plural: 'Imagens',
          },
          admin: {
            width: '50%',
            initCollapsed: true,
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return data?.titulo || `Imagem ${String(index).padStart(2, '0')}`;
              },
            },
          },
          fields: [
            {
              name: 'imagem',
              label: 'Imagem',
              type: 'upload',
              relationTo: 'imagens',
            },
          ],
        },

      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'fontes',
          type: 'array',
          label: 'Fontes',
          labels: {
            singular: 'Fonte',
            plural: 'Fontes',
          },
          admin: {
            width: '50%',
            initCollapsed: true,
            components: {
              RowLabel: ({ data }: { data: any }) => data.nome,
            },
          },
          fields: [
            {
              name: 'nome',
              label: 'Nome da fonte',
              type: 'text',
              required: true,
            },
            {
              name: 'referencia',
              label: 'Referência',
              type: 'text',
              admin: {
                description: 'Referência de utilização da fonte. Ex.: Título H1',
              },
            },

            {
              name: 'headCode',
              label: 'Head Link',
              type: 'code',
            },
            {
              name: 'importCode',
              label: 'Import CSS',
              type: 'code',
            },
            {
              name: 'classCode',
              label: 'Classes CSS',
              type: 'code',
            },
          ],
        },
        {
          name: 'cores',
          labels: {
            singular: 'Cor',
            plural: 'Cores',
          },
          type: 'array',
          admin: {
            width: '50%',
            initCollapsed: true,
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return data?.titulo || `Cores ${String(index).padStart(2, '0')}`;
              },
            },
          },
          fields: [
            {
              name: 'cor',
              type: 'relationship',
              relationTo: 'cores',
            },
          ],
        },
      ],
    },
    {
      type: 'array',
      name: 'tipografia',
      label: 'Tipografia',
      labels: {
        singular: 'Tipografia',
        plural: 'Tipografias',
      },
      admin: {
        width: '100%',
        initCollapsed: true,
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.tag || `Tag ${String(index).padStart(2, '0')}`;
          },
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'tag',
              label: 'Tag',
              type: 'select',
              options: tags,
            },
            {
              name: 'margin',
              label: 'Margin (rem)',
              type: 'number',
              admin: {
                width: '25%',
              },
            },
            {
              name: 'padding',
              label: 'Padding (rem)',
              type: 'number',
              admin: {
                width: '25%',
              },
            },
            {
              name: 'width',
              label: 'Width (rem)',
              type: 'number',
              admin: {
                width: '25%',
              },
            },
            {
              name: 'height',
              label: 'Height (rem)',
              type: 'number',
              admin: {
                width: '25%',
              },
            },
            {
              name: 'color',
              label: 'Color',
              type: 'relationship',
              relationTo: 'cores',
              admin: {
                width: '25%',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'fontSize',
                  label: 'Font Size (rem)',
                  type: 'number',
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'lineHeight',
                  label: 'Line Height (rem)',
                  type: 'number',
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'fontStyle',
                  label: 'Font Style',
                  type: 'select',
                  options: ['normal', 'italic', 'bold', 'bolder'],
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'textAlign',
                  label: 'Text Align',
                  type: 'select',
                  options: ['left', 'center', 'right'],
                  admin: {
                    width: '25%',
                  },
                },
              ],
            },
          ],
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
