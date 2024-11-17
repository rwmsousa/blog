import { CollectionConfig } from "payload/types";
import adminsAndUser from "./access/adminsAndUser";

export const Depoimentos: CollectionConfig = {
  slug: 'depoimentos',
  labels: {
    singular: 'Depoimento',
    plural: 'Depoimentos',
  },
  admin: {
    useAsTitle: 'nome_cliente',
    defaultColumns: ['id', 'nome_cliente', 'empreendimento', 'updatedAt'],
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
      name: 'imagem',
      label: 'Imagem do Cliente',
      type: 'upload',
      relationTo: 'imagens',
      required: true,
    },
    {
      name: 'nome_cliente',
      label: 'Nome Cliente',
      type: 'text',
      required: true,
    },
    {
      name: 'empreendimento',
      label: 'Empreendimento',
      type: 'text',
      required: true,
    },
    {
      name: 'depoimento',
      label: 'Depoimento',
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
    delete: adminsAndUser,
  },
};