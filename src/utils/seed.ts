import { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  // User 1: Gardener
  await payload.create({
    collection: 'creator',
    data: {
      email: 'email1@gmail.com',
      password: 'asd',
      // confirmPassword: 'asd',
      // fullName: 'Alice Green',
      // introduction_text: 'Passionate gardener with a love for sustainable living.',
      // inspiration_text: 'Inspired by nature and the beauty of plant life.',
      // avatar: '66ba5255552a53698f58f23b',
      // title: 'Head Gardener',
      // website: 'https://alicegarden.com',
      // linkedIn: 'https://linkedin.com/in/alicegreen',
      // role: 'Gardener',
    },
  })

  // User 2: Activist
  await payload.create({
    collection: 'creator',
    data: {
      email: 'email2@gmail.com',
      password: 'asd',
      // confirmPassword: 'asd',
      // fullName: 'Bob Brown',
      // introduction_text: 'Environmental activist fighting for climate justice.',
      // inspiration_text:
      //   'Inspired by the resilience of communities and the power of collective action.',
      // avatar: '66ba5255552a53698f58f23b',
      // title: 'Climate Activist',
      // website: 'https://bobbrownactivism.org',
      // linkedIn: 'https://linkedin.com/in/bobbrown',
      // role: 'Persona',
    },
  })

  // User 3: Gardener and Pest
  await payload.create({
    collection: 'creator',
    data: {
      email: 'email3@gmail.com',
      password: 'asd',
      // confirmPassword: 'asd',
      // fullName: 'Charlie Black',
      // introduction_text: 'Gardener with a knack for dealing with pests.',
      // inspiration_text: 'Inspired by the challenge of maintaining a healthy garden.',
      // avatar: '66ba5255552a53698f58f23b',
      // title: 'Gardener and Pest Control Specialist',
      // website: 'https://charliegarden.com',
      // linkedIn: 'https://linkedin.com/in/charlieblack',
      // role: 'Pest',
    },
  })

  // User 4: Pest
  await payload.create({
    collection: 'creator',
    data: {
      email: 'email4@gmail.com',
      password: 'asd',
      // confirmPassword: 'asd',
      // fullName: 'Dave Gray',
      // introduction_text: 'Specializes in pest management.',
      // inspiration_text: 'Driven by the challenge of keeping gardens pest-free.',
      // avatar: '66ba5255552a53698f58f23b',
      // title: 'Pest Management Expert',
      // website: 'https://davepestcontrol.com',
      // linkedIn: 'https://linkedin.com/in/davegray',
      // role: 'Pest',
    },
  })

  console.log('Seeding complete!')
}
