import React, { useEffect, useState } from 'react';
import Box from '@/components/Box';
import MainGrid from '@/components/MainGrid';
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

export default function Home() {
  const userGithub = 'mrsMatheusRocha';
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
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriarComunidade(e) {
              e.preventDefault();
              const dataForm = new FormData(e.target)
              const comunidade = {
                title: dataForm.get('title'),
                imageUrl: dataForm.get('image'),
                creatorSlug: userGithub
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json', 
                },
                body: JSON.stringify(comunidade),
              })
              .then(async (res) => {
                const dados = await res.json();
                const comunidade = dados.record;
                const comunidadesAtualizadas = [
                  ...comunidades,
                  comunidade
                ];
                setComunidades(comunidadesAtualizadas)
              })

            }}>
              <div>
                <input 
                  placeholder='Qual vai ser o nome da sua comunidade?' 
                  name='title' 
                  aria-label='Qual vai ser o nome da sua comunidade?' 
                  type='text'
                />
              </div>
              <div>
                <input 
                  placeholder='Coloque uma url para usarmos de capa' 
                  name='image' 
                  aria-label='Coloque uma url para usarmos de capa' 
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
          <Box>
            <h2 className="subTitle">O que você está pensando?</h2>
            <form onSubmit={function handleCriarPensamento(e) {
              e.preventDefault();
              const dataForm = new FormData(e.target)
              const thought = {
                thought: dataForm.get('thought'),
              }

              fetch('/api/pensamentos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json', 
                },
                body: JSON.stringify(thought),
              })
              .then(async (res) => {
                const dados = await res.json();
                const novoPensamento = dados.recordThougths;
                setPensamentos((pensamentosAtuais) => [
                  ...pensamentosAtuais,
                  novoPensamento
                ]);
              })

            }}>
              <div>
                <input 
                  placeholder='Digite o que está pensando' 
                  name='thought' 
                  aria-label='Digite o que está pensando' 
                />
              </div>
              <button>
                Publicar
              </button>
            </form>
          </Box>
          <Box>
            <h2 className="smallTitle">
              Pensamentos ({pensamentos.length})
            </h2>
            <ul>
              {pensamentos.map((itemAtual) => {
                return (
                  <li style={{listStyleType: 'none'}} key={itemAtual.id}>
                    <p>{itemAtual.thought}</p>
                    <hr/>
                  </li>
                )
              })}
            </ul>
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox 
            title='Seguidores'
            items={seguidores}
          />
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

