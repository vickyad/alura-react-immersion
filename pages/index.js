import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons"
import ProfileConnectionsBoxWrapper from "../src/components/ProfileConnections"
import React from "react"
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

const ProfileSideBar = (props) => {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '50%' }} />
      <hr />
      <p>
        <a className='boxLink' href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

const Test = (props) => {
  const firstSixItens = props.items.slice(0, 6)

  return (
    <ProfileConnectionsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {firstSixItens.map((item) => {
          return (
            <li key={item.id}>
              <a href={'#'}>
                <img src={`https://github.com/${item.login}.png`} />
                <span>{item.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileConnectionsBoxWrapper>
  )
}


const ComunityAndPeople = (props) => {
  const firstSixItens = props.list.slice(0, 6)

  return (
    <ProfileConnectionsBoxWrapper>
      <h2 className="smallTitle">
        {props.boxTitle} ({props.list.length})
      </h2>
      <ul>
        {firstSixItens.map((item) => {
          return (
            <li key={props.isStringList? item : item.id}>
              <a href={`${props.boxTitle.toLowerCase()}/${item.id}`}>
                <img src={props.isStringList? `https://github.com/${item}.png` : item.imageUrl} />
                <span>{props.isStringList? item : item.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileConnectionsBoxWrapper>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser
  const [communities, setCommunities] = React.useState([])
  const favoritePeople = ['prphawk', 'JPedroSilveira', 'AndrewLBorges', 'petcomputacaoufrgs', 'LeoHernandes', 'bbeneduzib']

  const [followers, setFollowers] = React.useState([])
  React.useEffect(() => {
    fetch('https://api.github.com/users/vickyad/followers').then(
      (serverAnswer) => {
        return serverAnswer.json()
      }
    ).then(
      (treatedAnswer) => {
        setFollowers(treatedAnswer)
      }
    )

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '56d5370ea7bbb7c967be9feb704cb5',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({"query": `query {
        allCommunities{
          title
          id
          imageUrl
          creatorSlug
        }
      }`  })
    })
      .then((response) => response.json())
      .then((treatedResponse) => {
        setCommunities(treatedResponse.data.allCommunities)
      })
  }, [])

  const handleCreateComunity = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newCommunity = {
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: githubUser,
    }  

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCommunity)
    })
      .then(async (response) => {
        const data = await response.json();
        setCommunities([...communities, data.registerCreated]);
      })
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem-vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle"> O que você deseja fazer?</h2>
            <form onSubmit={handleCreateComunity}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="connectionsArea" style={{ gridArea: 'connectionsArea' }}>
          <Test title="Seguidores" items={followers}/>
          <ComunityAndPeople boxTitle={'Comunidade'} list={communities} isStringList={false}/>
          <ComunityAndPeople boxTitle={'Pessoas da comunidade'} list={favoritePeople} isStringList={true}/>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const token = nookies.get(context).USER_TOKEN
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then(response => response.json())
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  
  const { githubUser } = jwt.decode(token)
  return {
    props: {
      githubUser: githubUser
    }
  }
}