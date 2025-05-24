import React, { useEffect, useState } from 'react';
import Box from '@/components/Box';
import MainGrid from '@/components/MainGrid';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import { ProfileRelationsBoxWrapper } from '@/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '@/lib/AluraKutCommons';

function ProfileSideBar(props) {
  return (
    <Box as='aside'>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a  className='boxLink' href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className='smallTitle'>
        {props.title} ({props.items.length})
      </h2>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const userGithub = props.githubUser;
  const [comunidades, setComunidades] = useState([]);
  const [pensamentos, setPensamentos] = useState([]);
  const pessoasFavoritas = [
    'HpBtw',
    'zPlcs',
    'Lelecasss',
    'BruRangel',
    'Jpdominguito',
    'fabriciofbmendes'
  ]

  const [seguidores, setSeguidores] = useState([]);

  useEffect(function() {
    const seguidores = fetch(`https://api.github.com/users/${userGithub}/followers`)
    .then(function (resServer) {
      return resServer.json();
    })
    .then (function(resFull) {
      setSeguidores(resFull);
    });

    fetch(`https://graphql.datocms.com/`, {
      method: 'POST',
      headers: {
        'Authorization': '44fad9c156aba49aedad1f893e7dca',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({'query': 
        `
        query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
          allThoughts {
            id
            thought
          }
        }
      `})
    })
    .then((res) => res.json())
    .then((resFull) => {
      const comunidadesDato = resFull.data.allCommunities;
      const pensamentosDato = resFull.data.allThoughts;
      setComunidades(comunidadesDato);
      setPensamentos(pensamentosDato);
    })
  }, [])

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea'}}>
          <ProfileSideBar githubUser={userGithub} />
        </div>
        <div className='welcomeArea' style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="smallTitle">
              Amigos que você segue ({seguidores.length}): 
            </h2>
            <ProfileRelationsBoxWrapper>
              <ul>
                {seguidores.map((pessoaAtual) => (
                  <li key={pessoaAtual.id}>
                    <a href={`https://github.com/${pessoaAtual.login}`} target="_blank" rel="noopener noreferrer">
                      <img src={pessoaAtual.avatar_url} alt={`Imagem de ${pessoaAtual.login}`} />
                      <span>{pessoaAtual.login}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </ProfileRelationsBoxWrapper>
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguidores ({seguidores.length})
            </h2>
            <ul>
              {seguidores.slice(0, 6).map((pessoaAtual) => (
                <li key={pessoaAtual.id}>
                  <a href={`https://github.com/${pessoaAtual.login}`} target="_blank" rel="noopener noreferrer">
                    <img src={pessoaAtual.avatar_url} alt={`Imagem de ${pessoaAtual.login}`} />
                    <span>{pessoaAtual.login}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((pessoaAtual) => {
                return  (
                  <li>
                    <a href={`https://github.com/${pessoaAtual}`} target="_blank" key={pessoaAtual}>
                      <img src={`https://github.com/${pessoaAtual}.png`} />
                      <span>{pessoaAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, 
  }
}