import { CollectionConfig } from 'payload/types';
import admins from './access/admins';
import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import adminsAndUser from './access/adminsAndUser';

export const Contatos: CollectionConfig = {
  slug: 'contatos',
  labels: {
    singular: 'Contato',
    plural: 'Contatos',
  },
  admin: {
    useAsTitle: 'tituloLista',
    defaultColumns: ['id', 'tituloLista', 'subtitulo', 'contatos', 'updatedAt'],
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
  defaultSort: 'updatedAt',
  fields: [
    {
      name: 'tituloLista',
      label: 'Título da Lista',
      type: 'text',
      required: true,
      access: {
        update: admins,
      },
    },
    {
      name: 'subtitulo',
      label: 'Subtítulo',
      type: 'text',
      required: false,
    },
    {
      name: 'contatos',
      label: 'Contatos',
      type: 'array',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.nome || `Contato ${String(index).padStart(2, '0')}`;
          },
        },
      },
      fields: [
        {
          name: 'nome',
          label: 'Nome',
          type: 'text',
          required: true,
        },
        {
          name: 'telefone',
          label: 'Telefone',
          type: 'text',
          required: false,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          required: false,
        },
        {
          name: 'funcao',
          label: 'Função',
          type: 'text',
          required: false,
        },
        {
          name: 'diretoria',
          label: 'Diretoria',
          type: 'text',
          required: false,
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
