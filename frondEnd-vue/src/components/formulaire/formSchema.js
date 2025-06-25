// formSchema.js
export const formSchema = [
  {
    key: 'name',
    label: 'Nom',
    component: 'BaseInput',
    model: '',
    props: {
      type: 'text',
      placeholder: 'Entrez votre nom'
    }
  },
  {
    key: 'bio',
    label: 'Bio',
    component: 'BaseTextarea',
    model: '',
    props: {
      placeholder: 'Écrivez une description...'
    }
  },
  {
    key: 'gender',
    label: 'Genre',
    component: 'BaseSelect',
    model: '',
    props: {
      options: ['Homme', 'Femme', 'Autre']
    }
  }
]
