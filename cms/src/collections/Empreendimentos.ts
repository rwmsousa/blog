import { CollectionConfig } from 'payload/types';
import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import admins from './access/admins';
import adminsAndUser from './access/adminsAndUser';
import { callRevalidate } from './hooks/revalidate';

export const Empreendimentos: CollectionConfig = {
  slug: 'empreendimentos',
  labels: {
    singular: 'Empreendimento',
    plural: 'Empreendimentos',
  },
  admin: {
    useAsTitle: 'empreendimento',
    defaultColumns: ['id', 'empreendimento', 'updatedAt'],
    preview: (doc, { locale }) => {
      if (doc?.slug) {
        return `${process.env.PAYLOAD_PUBLIC_SITE_URL}/apartamentos-a-venda/${doc.slug}?locale=${locale}`;
      }
      return null;
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
  fields: [
    {
      name: 'visualizacao',
      label: 'Visualização',
      type: 'select',
      options: [
        {
          label: 'Venda',
          value: 'venda',
        },
        {
          label: 'Portfolio',
          value: 'portfolio',
        },
        {
          label: 'Rascunho',
          value: 'rascunho',
        },
      ],
      defaultValue: 'rascunho',
      required: false,
      admin: {
        width: '20%',
      },
    },
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'empreendimento',
          label: 'Empreendimento',
          required: true,
          admin: {
            width: '30%',
          },
          access: {
            update: admins,
          },
        },
        {
          name: 'slug',
          label: 'Slug',
          type: 'text',
          required: true,
          admin: {
            width: '30%',
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
            width: '30%',
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
            width: '10%',
          },
        },
        {
          name: 'bairro',
          label: 'Bairro',
          type: 'text',
          required: true,
          admin: {
            width: '30%',
          },
        },
        {
          name: 'complemento',
          label: 'Complemento',
          type: 'text',
          required: false,
          admin: {
            width: '30%',
          },
        },
        {
          name: 'cidade',
          label: 'Cidade',
          type: 'text',
          required: true,
          admin: {
            width: '30%',
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
            width: '10%',
          },
        },
        {
          name: 'cep',
          label: 'CEP',
          type: 'text',
          required: false,
          admin: {
            width: '15%',
          },
        },
        {
          name: 'latitude',
          label: 'Latitude',
          type: 'text',
          required: true,
          admin: {
            width: '20%',
          },
        },
        {
          name: 'longitude',
          label: 'Longitude',
          type: 'text',
          required: true,
          admin: {
            width: '20%',
          },
        },
        {
          name: 'googleMaps',
          label: 'Google Maps',
          type: 'text',
          required: true,
          admin: {
            width: '35%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'tipologia',
          label: 'Tipologia',
          type: 'text',
          required: true,
          admin: {
            width: '25%',
            description: 'Ex: "Studio, 2 e 3 Quartos com Suíte".',
          },
        },
        {
          name: 'area_comum',
          label: 'Área Comum',
          type: 'text',
          required: true,
          admin: {
            width: '25%',
            description: 'Ex: "Fireplace, Áreas Gourmet, Espaço Pet."',
          },
        },
        {
          name: 'area_privativa',
          label: 'Área Privativa',
          type: 'text',
          required: true,
          admin: {
            width: '25%',
            description: 'Ex: "70,23m² a 107,95m² Privativos".',
          },
        },
        {
          name: 'garagem',
          label: 'Garagem',
          type: 'text',
          required: true,
          admin: {
            width: '25%',
            description: 'Ex: "Até 2 vagas de garagem".',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'fase_obra',
          label: 'Fase da Obra',
          type: 'select',
          options: [
            { label: 'Pré-lançamento', value: 'pre-lancamento' },
            { label: 'Lançamento', value: 'lancamento' },
            { label: 'Em Construção', value: 'em-construcao' },
            { label: 'Pronto pra morar', value: 'pronto-pra-morar' },
          ],
          defaultValue: 'pre-lancamento',
          required: false,
          admin: {
            width: '20%',
          },
        },
        {
          name: 'entrega',
          label: 'Entrega',
          type: 'date',
          required: false,
          admin: {
            width: '20%',
          },
        },
        {
          name: 'valor_minimo',
          label: 'Valor Mínimo',
          type: 'number',
          required: false,
          admin: {
            width: '20%',
            description: 'Valor do imóvel de menor valor disponível.',
          },
        },
        {
          name: 'valor_maximo',
          label: 'Valor Máximo',
          type: 'number',
          required: false,
          admin: {
            width: '20%',
            description: 'Valor do imóvel de maior valor disponível.',
          },
        },
        {
          name: 'percentual_vendido',
          label: 'Percentual Vendido',
          type: 'number',
          required: false,
          admin: {
            width: '20%',
            description: 'Percentual de unidades vendidas.',
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
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
      ],
    },
    {
      type: 'row',
      fields: [

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
      type: 'group',
      label: 'SEO',
      name: 'seo',
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
