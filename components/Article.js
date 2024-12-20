import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../reducers/bookmarks';
import { addHiddenArticle, removeHiddenArticle } from '../reducers/hiddenArticles';
import Image from 'next/image';
import styles from '../styles/Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const url = process.env.BACK_URL;

function Article(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);

	const handleBookmarkClick = () => {
		if (!user.token) {
			return;
		}

		fetch(`${url}/users/canBookmark/${user.token}`)
			.then(response => response.json())
			.then(data => {
				if (data.result && data.canBookmark) {
					if (props.isBookmarked) {
						dispatch(removeBookmark(props));
					} else {
						dispatch(addBookmark(props));
					}
				}
			});
	}
	const handleHiddenArticlesClick = () => {
		if (props.isHiddenArticle){
			dispatch(removeHiddenArticle(props))
		}else{
			dispatch(addHiddenArticle(props))
		}
	}

	let iconStyleBookmarked = {};
	if (props.isBookmarked) {
		iconStyleBookmarked = { 'color': '#E9BE59' };
	}
	let iconStyleHiddenArticle = {};
	if (props.isHiddenArticle) {
		iconStyleHiddenArticle = { 'color': '#E9BE59' };
	}

	return (
		<div className={styles.articles}>
			<div className={styles.articleHeader}>
				<h3>{props.title}</h3>
				<FontAwesomeIcon onClick={() => handleBookmarkClick()} icon={faBookmark} style={iconStyleBookmarked} className={styles.bookmarkIcon} />
				{props.isBookmarked? <></> : <FontAwesomeIcon onClick={() => handleHiddenArticlesClick()} icon={faEyeSlash} style={iconStyleHiddenArticle} className={styles.bookmarkIcon} />}
			</div>
			<h4 style={{ textAlign: "right" }}>- {props.author}</h4>
			<div className={styles.divider}></div>
			<Image src={props.urlToImage} alt={props.title} width={600} height={314} />
			<p>{props.description}</p>
		</div>
	);
}

export default Article;
