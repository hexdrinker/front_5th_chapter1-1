import Header from "../components/header";
import Footer from "../components/footer";
import Post from "../components/post";
import { MOCK_POSTS } from "../constants";
import store from "../store";
import { createComponent } from "../core/component";

const HomePage = createComponent(
  () => {
    const { isLoggedIn } = store.getState();
    const header = Header({ isLoggedIn });
    const footer = Footer();
    const posts = MOCK_POSTS.map(
      ({ content, createdAt, thumbnail, author }) =>
        Post({ content, createdAt, thumbnail, author }).html,
    );

    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${header.html}

          <main class="p-4">
            <div class="mb-4 bg-white rounded-lg shadow p-4">
              <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
              <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
            </div>

            <div class="space-y-4">
              ${posts.join("")}
            </div>
          </main>

          ${footer.html}
        </div>
      </div>
    `;
  },
  (container) => {
    const { isLoggedIn } = store.getState();
    Header({ isLoggedIn }).mount(container);
  },
);

export default HomePage;
