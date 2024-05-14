export interface Episode {
  id_series: string
  sub_judul: string
  sinopsis: string
  durasi: number
  url_video: string
  release_date: string
}

export interface MainEpisode extends Episode {
  judul: string
}

export interface EpisodeData {
  episode: MainEpisode
  another_episodes: Episode[]
}
