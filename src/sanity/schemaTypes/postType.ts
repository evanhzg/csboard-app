import {defineField, defineType} from 'sanity'

const supportedLanguages = [
  { id: 'fr', title: 'French', isDefault: true },
  { id: 'en', title: 'English' }
]

export const baseLanguage = supportedLanguages.find(l => l.isDefault)

export const localeString = defineType({
  title: 'Localized string',
  name: 'localeString',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    fieldset: lang.isDefault ? undefined : 'translations'
  }))
})

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title.fr', // Assuming 'fr' is the default language
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'localeString',
    }),
    defineField({
      name: 'link',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title.fr', // Assuming 'fr' is the default language
      publishedAt: 'publishedAt',
    },
  },
})