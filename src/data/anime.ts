// 本地番剧数据配置
export type AnimeItem = {
	title: string;
	status: "watching" | "completed" | "planned";
	rating: number;
	cover: string;
	description: string;
	episodes: string;
	year: string;
	genre: string[];
	studio: string;
	link: string;
	progress: number;
	totalEpisodes: number;
	startDate: string;
	endDate: string;
};

const localAnimeList: AnimeItem[] = [
	{
		title: "凡人修仙传",
		status: "watching",
		rating: 9.8,
		cover: "/assets/anime/fanren.webp",
		description: "凡人的修仙历程~",
		episodes: "12 episodes",
		year: "2020",
		genre: ["动作", "修仙", "冒险", "奇幻"],
		studio: "A-1 Pictures",
		link: "https://www.bilibili.com/bangumi/media/md28223043",
		progress: 40,
		totalEpisodes: 164,
		startDate: "2022-07",
		endDate: "2022-09",
	},
	{
		title: "Yowamushi Pedal",
		status: "watching",
		rating: 9.5,
		cover: "/assets/anime/rynh.webp",
		description: "Girl's daily life, sweet and healing",
		episodes: "12 episodes",
		year: "2015",
		genre: ["Daily life", "Healing"],
		studio: "Nexus",
		link: "https://www.bilibili.com/bangumi/media/md2590",
		progress: 8,
		totalEpisodes: 12,
		startDate: "2015-07",
		endDate: "2015-09",
	},
	{
		title: "Asteroid in Love",
		status: "watching",
		rating: 9.2,
		cover: "/assets/anime/laxxx.webp",
		description: "Meeting girls among the stars, pure love and healing",
		episodes: "12 episodes",
		year: "2020",
		genre: ["Romance", "Healing"],
		studio: "Doga Kobo",
		link: "https://www.bilibili.com/bangumi/media/md28224128",
		progress: 5,
		totalEpisodes: 12,
		startDate: "2020-01",
		endDate: "2020-03",
	},
	{
		title: "Is the Order a Rabbit?",
		status: "completed",
		rating: 9.0,
		cover: "/assets/anime/tz1.webp",
		description: "A group of girls' warm daily life",
		episodes: "12 episodes",
		year: "2014",
		genre: ["Daily life", "Healing"],
		studio: "White Fox",
		link: "https://www.bilibili.com/bangumi/media/md2762",
		progress: 12,
		totalEpisodes: 12,
		startDate: "2014-04",
		endDate: "2014-06",
	},
	{
		title: "The Secret of the Magic Girl",
		status: "watching",
		rating: 9.0,
		cover: "/assets/anime/cmmn.webp",
		description: "Muli, Muli!",
		episodes: "12 episodes",
		year: "2024",
		genre: ["Daily life", "Healing", "Magic"],
		studio: "C2C",
		link: "https://www.bilibili.com/bangumi/media/md26625039",
		progress: 8,
		totalEpisodes: 12,
		startDate: "2025-07",
		endDate: "2025-10",
	},
];

export default localAnimeList;
