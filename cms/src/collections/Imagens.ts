import { CollectionConfig } from 'payload/types';

import path from 'path';

import { PhotoCollectionDescription } from './components/photo-collection-description';
import admins from './access/admins';
import adminsAndUser from './access/adminsAndUser';


export const Imagens: CollectionConfig = {
  slug: 'imagens',
  labels: {
    singular: 'Imagem',
    plural: 'Imagens',
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['id', 'titulo', 'updatedAt'],
    enableRichTextLink: false,
    enableRichTextRelationship: false,
    group: 'Uploads',
    description: PhotoCollectionDescription,

    pagination: {
      defaultLimit: 50,
      limits: [10, 20, 30, 40, 50],
    },
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
  upload: {
    adminThumbnail: 'thumbnail',
    staticURL: '/uploads/imagens',
    staticDir: path.resolve(__dirname, '../uploads/imagens'),
    disableLocalStorage: false,
    focalPoint: false,
    crop: false,
    imageSizes: [
      {
        name: 'thumbnail',
        height: 400,
        width: 400,
        position: 'center',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'square',
        width: 1200,
        height: 1200,
        position: 'center',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'small',
        width: 900,
        // height: 600,
        position: 'center',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'medium',
        width: 1200,
        // height: 800,
        position: 'center',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'large',
        width: 2100,
        // height: 1400,
        position: 'center',
        formatOptions: {
          format: 'webp',
        },
      },
    ],
    mimeTypes: ['image/*', 'image/png'],
  },
  fields: [
    {
      name: 'titulo',
      label: 'Título',
      type: 'text',
      required: true,
      admin: {
        description: 'Insira um título opcional para esta imagem.',
      },
      access: {
        update: admins,
      },
    },
    {
      name: 'alt',
      label: 'Texto Alternativo',
      type: 'text',
      required: false,
      admin: {
        description:
          'Insira um texto alternativo para esta imagem. O texto alternativo é importante para indivíduos que usam tecnologia assistiva, como leitores de tela.',
      },
    },
    {
      name: 'caption',
      label: 'Legenda',
      type: 'text',
      required: false,
      admin: {
        description: 'Insira uma legenda descritiva para esta imagem.',
      },
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
