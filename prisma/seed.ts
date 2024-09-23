import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  const existingUser = await prisma.usuario.findUnique({
    where: {
      usuario: 'admin-master',
    },
  })

  if (!existingUser) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash('123456789@', saltRounds)

    await prisma.usuario.create({
      data: {
        id: randomUUID(),
        nome: 'txai',
        email: 'txai@email.com',
        usuario: 'admin-master',
        password: hashedPassword,
        cpf: 'admin-master',
        dataCadastro: new Date(),
        cargo: 'administrador',
      },
    })

    console.log('Usuário padrão criado com sucesso!')
  } else {
    console.log('Usuário padrão já existe.')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
