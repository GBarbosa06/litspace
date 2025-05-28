# 📚 LitSpace

**LitSpace** é um espaço feito para leitores explorarem livros, compartilharem opiniões e organizarem suas leituras. Crie sua conta, avalie livros, veja o que outros leitores estão lendo e mantenha sua estante virtual sempre atualizada.

🔗 Acesse agora: [litspace.vercel.app](https://litspace.vercel.app)

## 🚀 Funcionalidades

* ✅ **Autenticação com Firebase** (login/cadastro)
* 🔍 **Exploração de livros** com descrição e detalhes
* ⭐ **Avaliações personalizadas** (nota e resenha)
* 📖 **Estante virtual** com organização por status:

  * Lidos
  * Lendo
  * Para ler
* 💬 **Feed de avaliações** de outros usuários

## ⚙️ Tecnologias

* **Frontend**: [React](https://reactjs.org/)
* **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
* **Backend/DB/Auth**: [Firebase](https://firebase.google.com/)
* **Deploy**: [Vercel](https://vercel.com/)

## 📦 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/seunome/litspace.git
cd litspace

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

Antes de rodar, crie um arquivo `.env` com suas chaves do Firebase:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## 💡 Ideias futuras

* Recomendação inteligente baseada nas suas leituras
* Comentários em avaliações
* Dark mode 🌓
* Notificações e interações sociais

## 🤝 Contribuições

Quer contribuir? Puxa uma issue, faz um fork, manda um PR — vai ser ótimo ter sua ajuda.

## 📄 Licença

Este projeto está sob a licença MIT.