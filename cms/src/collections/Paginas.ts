import { CollectionConfig } from 'payload/types';

import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import admins from './access/admins';
import adminsAndUser from './access/adminsAndUser';
import { callRevalidate } from './hooks/revalidate';

export const Paginas: CollectionConfig = {
  slug: 'paginas',
  labels: {
    singular: 'Página',
    plural: 'Páginas',
  },
  defaultSort: 'updatedAt',
  admin: {
    useAsTitle: 'pagina',
    defaultColumns: ['id', 'pagina', 'updatedAt'],
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
      type: 'text',
      name: 'pagina',
      label: 'Página',
      required: true,
      access: {
        update: admins,
      },
    },
    {
      type: 'row',
      fields: [
        {
          type: 'array',
          name: 'textos',
          label: 'Textos',
          labels: {
            singular: 'Texto',
            plural: 'Textos',
          },
          admin: {
            initCollapsed: true,
            width: '50%',
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return data?.referencia || `Texto ${String(index).padStart(2, '0')}`;
              },
            },
          },
          fields: [
            {
              name: 'referencia',
              label: 'Referência',
              type: 'text',
              required: true,
              access: {
                update: admins,
              },
            },
            {
              name: 'texto',
              label: 'Texto',
              type: 'relationship',
              relationTo: 'textos',
              required: true,
            },
          ],
        },
        {
          type: 'array',
          name: 'imagens',
          label: 'Imagens',
          labels: {
            singular: 'Imagem',
            plural: 'Imagens',
          },
          admin: {
            initCollapsed: true,
            width: '50%',
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return data?.referencia || `Texto ${String(index).padStart(2, '0')}`;
              },
            },
          },
          fields: [
            {
              name: 'referencia',
              label: 'Referência',
              type: 'text',
              required: true,
              access: {
                update: admins,
              },
            },
            {
              name: 'imagem',
              label: 'Imagem',
              type: 'upload',
              relationTo: 'imagens',
              required: true,
            },
          ],
        },
        {
          type: 'array',
          name: 'listas',
          label: 'Listas',
          labels: {
            singular: 'Lista',
            plural: 'Listas',
          },
          admin: {
            initCollapsed: true,
            width: '50%',
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return data?.referencia || `Lista ${String(index).padStart(2, '0')}`;
              },
            },
          },
          fields: [
            {
              name: 'referencia',
              label: 'Referência',
              type: 'text',
              required: true,
              access: {
                update: admins,
              },
            },
            {
              name: 'lista',
              label: 'Lista',
              type: 'relationship',
              relationTo: 'listas',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'array',
          name: 'contatos',
          label: 'Contatos',
          labels: {
            singular: 'Contato',
            plural: 'Contatos',
          },
          admin: {
            initCollapsed: true,
            width: '50%',
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return data?.referencia || `Contato ${String(index).padStart(2, '0')}`;
              },
            },
          },
          fields: [
            {
              name: 'referencia',
              label: 'Referência',
              type: 'text',
              required: true,
              access: {
                update: admins,
              },
            },
            {
              name: 'contato',
              label: 'Contato',
              type: 'relationship',
              relationTo: 'contatos',
              required: true,
            },
          ],
        },
        {
          type: 'array',
          name: 'depoimentos',
          label: 'Depoimentos',
          labels: {
            singular: 'Depoimento',
            plural: 'Depoimentos',
          },
          admin: {
            initCollapsed: true,
            width: '50%',
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return data?.referencia || `Depoimento ${String(index).padStart(2, '0')}`;
              },
            },
          },
          fields: [
            {
              name: 'referencia',
              label: 'Referência',
              type: 'text',
              required: true,
            },
            {
              name: 'depoimento',
              label: 'Depoimento',
              type: 'relationship',
              relationTo: 'depoimentos',
              required: true,
            },
          ],
        },
        {
          type: 'array',
          name: 'cores',
          label: 'Cores',
          labels: {
            singular: 'Cor',
            plural: 'Cores',
          },
          admin: {
            initCollapsed: true,
            width: '50%',
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return data?.referencia || `Cor ${String(index).padStart(2, '0')}`;
              },
            },
          },
          fields: [
            {
              name: 'referencia',
              label: 'Referência',
              type: 'text',
              required: true,
              access: {
                update: admins,
              },
            },
            {
              name: 'cor',
              label: 'Cor',
              type: 'relationship',
              relationTo: 'cores',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [

        {
          type: 'array',
          name: 'links',
          label: 'Links',
          labels: {
            singular: 'Link',
            plural: 'Links',
          },
          admin: {
            initCollapsed: true,
            width: '50%',
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return data?.referencia || `Link ${String(index).padStart(2, '0')}`;
              },
            },
          },
          fields: [
            {
              name: 'referencia',
              label: 'Referência',
              type: 'text',
              required: true,
              access: {
                update: admins,
              },
            },
            {
              name: 'link',
              label: 'Link',
              type: 'relationship',
              relationTo: 'links',
              required: true,
            },
          ],
        },
        {
          type: 'array',
          name: 'categorias',
          label: 'Categorias',
          labels: {
            singular: 'Categoria',
            plural: 'Categorias',
          },
          admin: {
            initCollapsed: true,
            width: '50%',
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return data?.referencia || `Categoria ${String(index).padStart(2, '0')}`;
              },
            },
          },
          fields: [
            {
              name: 'referencia',
              label: 'Referência',
              type: 'text',
              required: true,
              access: {
                update: admins,
              },
            },
            {
              name: 'categoria',
              label: 'Categoria',
              type: 'relationship',
              relationTo: 'categorias',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      label: 'SEO',
      name: 'seo',
      admin: {
        width: '50%',
      },
      fields: [
        {
          name: 'seo',
          label: ' ',
          type: 'relationship',
          relationTo: 'seo',
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
