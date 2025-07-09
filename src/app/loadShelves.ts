import API from "./api";
import { Game } from "./types";

export async function fetchUserShelves(username: string) {
  const [favorites, playing, played, wishlist] = await Promise.all([
    API.get(`/shelf/user/${username}/favorites`),
    API.get(`/shelf/user/${username}/playing`),
    API.get(`/shelf/user/${username}/played`),
    API.get(`/shelf/user/${username}/wishlist`),
  ]);
  console.log("Raw API response:", favorites.data);

  return {
    favorites: favorites.data,
    playing: playing.data,
    played: played.data,
    wishlist: wishlist.data,
  };
}

export async function fetchGameDetails(gameId: string): Promise<Game | null> {
  try {
    const response = await API.post("/igdb/search-by-id", { id: gameId });
    const responseData = response.data;

    const rawGame = Array.isArray(responseData)
      ? responseData[0]
      : responseData;

    const game: Game = {
      id: rawGame.id,
      name: rawGame.name,
      cover: rawGame.cover
        ? {
            url: rawGame.cover.url,
          }
        : undefined,
      summary: rawGame.summary ? rawGame.summary : "",
    };

    return game;
  } catch (error) {
    console.error("Error fetching game details:", {
      gameId,
    });
    return null;
  }
}

export async function loadAllShelves(username: string): Promise<{
  favs: Game[];
  playing: Game[];
  played: Game[];
  wish: Game[];
}> {
  const { favorites, playing, played, wishlist } = await fetchUserShelves(
    username
  );

  const fetchWithDelay = async (id: string, delay: number) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchGameDetails(id);
  };

  const processShelf = async (ids: string[]) => {
    const results: Game[] = [];
    for (const id of ids) {
      const game = await fetchWithDelay(id, 200);
      if (game) results.push(game);
    }
    return results;
  };

  const [favs, playingGames, playedGames, wish] = await Promise.all([
    processShelf(favorites),
    processShelf(playing),
    processShelf(played),
    processShelf(wishlist),
  ]);

  return { favs, playing: playingGames, played: playedGames, wish };
}
