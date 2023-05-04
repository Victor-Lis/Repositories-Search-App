import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import { Container, Owner, Loading, BackButton, IssuesList, Row, PageActions, FilterList } from '../Styles/repoStyles'
import { FaSpinner, FaArrowLeft } from 'react-icons/fa'

export default function Repositorio() {

  const { repositorio } = useParams()

  const [repo, setRepo] = useState({})
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState([
    {state: 'all', label: 'Todas'},
    {state: 'open', label: 'Abertas'},
    {state: 'closed', label: 'Fechadas'},
  ]);
  const [filterIndex, setFilterIndex] = useState(0)

  function handleFilter(index){

    setFilterIndex(index)

  }

  function handlePage(action){

    if(action === "next" && page < issues.length){

      setPage(page+1)
      
    }else if(action === "back" && page > 1){

      setPage(page-1)

    }

  }

  useEffect(() => {

    async function loadIssues(){

      const nomeRepo = decodeURIComponent(repositorio)
      const response = await api.get(`/repos/${nomeRepo}/issues`, {

        params:{

          state: filters[filterIndex].state,
          page,
          per_page: 5,

        }

      })

      setIssues(response.data)

    }

    loadIssues()

  }, [filterIndex, page, repositorio])

  useEffect(() => {

    async function load(){

      const nomeRepo = decodeURIComponent(repositorio)

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {

          params:{

            state: filters[filterIndex].state,
            page,
            per_page: 5,  

          }

        })
      ]) 

      
        setRepo(repositorioData.data)
        setIssues(issuesData.data)
        setLoading(false)
          
    }

    load()

  }, [repositorio])

  if(loading){

    return (

      <Loading loading={loading.toString()}>

        <FaSpinner size={75} color='#FFF'/>
        <h1 style={{marginTop: 20}}> Carregando... </h1>

      </Loading>

    )

  }else{

    return (
      <Container>
          
        <BackButton to="/">

          <FaArrowLeft color='#000' size={25}/>

        </BackButton>

        <Owner>
  
          <img 
            src={repo.owner.avatar_url} 
            alt={repo.owner.login}
          />
  
          <h1> {repo.name} </h1>
          <p> {repo.description} </p>
  
        </Owner>

        <FilterList active={filterIndex}>

        {filters.map((filter, index) => (
            <button
             type="button"
             key={filter.label}
             onClick={()=> handleFilter(index)}
            >
              {filter.label}
            </button>
          ))}

        </FilterList>

        <IssuesList>

          {issues.map(issue => (

              <li key={String(issue.id)}>

                <img src={issue.user.avatar_url} alt={issue.user.login}/>

                <main>

                  <strong>

                    <a href={issue.html_url}>{issue.title}</a>

                    <Row>
                      {issue.labels.map(label => (

                        <span key={String(label.id)}> {label.name} </span>

                      ))}
                    </Row>

                  </strong>

                  <p> {issue.user.login} </p>

                </main>

              </li>

          ))}

        </IssuesList>

        <PageActions>

          <button 
            type='button' 
            onClick={() => {handlePage("back")}}
            disabled={page < 2}
          > Voltar </button>
          <button type='button' onClick={() => {handlePage("next")}}> Próxima </button>

        </PageActions>
  
      </Container>
    )

  } 

}
