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
  const [comunidades, setComunidades] = useState([{
    id: '12802378123789378912789789123896123', 
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
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
    }, []);
  })

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
                id: new Date().toISOString(),
                title: dataForm.get('title'),
                image: dataForm.get('image')
              }
              const comunidadesAtualizadas = [
                ...comunidades,
                comunidade
              ];
              setComunidades(comunidadesAtualizadas)
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
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
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

