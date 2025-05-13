import React from 'react';
import Box from '@/components/Box';
import MainGrid from '@/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '@/components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet } from '@/lib/AluraKutCommons';

function ProfileSideBar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const userGithub = 'mrsMatheusRocha';

  const pessoasFavoritas = [
    'HpBtw',
    'zPlcs',
    'Lelecasss',
    'BruRangel',
    'Jpdominguito',
  ]

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
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((pessoaAtual) => {
                return  (
                  <li>
                    <a href={`/users/${pessoaAtual}`} key={pessoaAtual}>
                      <img src={`https://github.com/${pessoaAtual}.png`} />
                      <span>{pessoaAtual}</span>
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

