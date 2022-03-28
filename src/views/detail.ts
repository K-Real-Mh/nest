import { News } from '../news/news.interface';
import { Comment } from '../news/comments/comment.interface';

export const detailTemplate = (news: News, comments: Comment[]) => {
  if (!news) {
    return emptyDetail();
  }

  return `
    <div class="row">
      <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
              Автор: ${news.author}
              </h6>
              <h6 class="card-subtitle mb-2 text-muted">
              Дата создания: ${news.createdAt}
              </h6>
              <p class="card-text">${news.description}</p>
              ${commentsTemplate(comments)}
            </div>
          </div>
        </div>
    </div>
  `;
};

const emptyDetail = () => {
  return `<h1>Такой новости не найдено!</h1>`;
};

const commentsTemplate = (comments: Comment[]) => {
  console.log(comments);
  if (!comments) {
    return '';
  }

  let html = '<ul>';
  for (const comment of comments) {
    html += `
      <li>${comment.comment}</li>
    `;
  }
  html += '</ul>';
  return html;
};
