import Mail from '../lib/Mail'

export default {
  key: 'RegistrationMail',
  options: {
    delay: 5000,
    priority: 3,
    repeat: {
      every: 1,
      limit: 1
    }
  },
  async handle ({ data }) {
    const { user } = data

    await Mail.sendMail({
      from: 'Heverton P. da Luz <h.pires03@gmail.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de usuário',
      html: `Olá, ${user.name}, bem-vindo a <b>HRproduções</b>!`
    })
  }
}
