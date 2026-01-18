import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'leorodriguesdev';

export async function GET() {
  try {
    // Buscar dados do usuário
    const userResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!userResponse.ok) {
      throw new Error('Failed to fetch GitHub user data');
    }

    const user = await userResponse.json();

    // Buscar repositórios públicos do usuário
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!reposResponse.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }

    const repos = await reposResponse.json();

    // Tipos para GitHub API
    interface GitHubRepo {
      fork: boolean;
      name: string;
      stargazers_count: number;
      forks_count: number;
    }

    interface GitHubLanguages {
      [key: string]: number;
    }

    // Filtrar apenas repositórios que não são forks
    const ownRepos = repos.filter((repo: GitHubRepo) => !repo.fork);

    // Calcular estatísticas agregadas
    const totalStars = ownRepos.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0);
    const totalForks = ownRepos.reduce((sum: number, repo: GitHubRepo) => sum + repo.forks_count, 0);

    // Buscar linhas de código dos principais repositórios
    let totalLines = 0;
    const statsPromises = ownRepos.slice(0, 20).map(async (repo: GitHubRepo) => {
      try {
        const statsResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
            },
            next: { revalidate: 3600 }
          }
        );

        if (statsResponse.ok) {
          const languages = await statsResponse.json() as GitHubLanguages;
          const repoLines = Object.values(languages).reduce((sum: number, lines: number) => sum + lines, 0);
          return repoLines;
        }
        return 0;
      } catch {
        return 0;
      }
    });

    const repoLinesArray = await Promise.all(statsPromises);
    totalLines = repoLinesArray.reduce((sum, lines) => sum + lines, 0);

    // Converter linhas para formato de exibição
    let formattedLines = totalLines;
    let suffix = '';
    
    if (totalLines >= 1000000) {
      formattedLines = Math.floor(totalLines / 100000) / 10;
      suffix = 'M';
    } else if (totalLines >= 1000) {
      formattedLines = Math.floor(totalLines / 100) / 10;
      suffix = 'K';
    }

    return NextResponse.json({
      // Dados do usuário
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      
      // Dados agregados dos repositórios
      totalStars,
      totalForks,
      ownReposCount: ownRepos.length,
      
      // Linhas de código
      linesOfCode: formattedLines,
      suffix,
      rawLines: totalLines,
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    // Retornar valores padrão em caso de erro
    return NextResponse.json({
      publicRepos: 0,
      followers: 0,
      following: 0,
      totalStars: 0,
      totalForks: 0,
      ownReposCount: 0,
      linesOfCode: 50,
      suffix: 'K',
      rawLines: 50000,
    });
  }
}
