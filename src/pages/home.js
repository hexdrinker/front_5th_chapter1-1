import Header from "../components/header";
import Footer from "../components/footer";
import Post from "../components/post";
import { MOCK_POSTS } from "../constants";
import { createComponent } from "../core/component";

const HomePage = createComponent({
  name: "HomePage",
  render: ({ isLoggedIn, children }) => {
    children.header = Header({ isLoggedIn });
    children.footer = Footer();
    children.posts = MOCK_POSTS.map(
      ({ content, createdAt, thumbnail, author }) =>
        Post({ content, createdAt, thumbnail, author }),
    );
    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${children.header.html}

          <main class="p-4">
            <div class="mb-4 bg-white rounded-lg shadow p-4">
              <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
              <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
            </div>

            <div class="space-y-4">
              ${children.posts.map((post) => post.html).join("")}
            </div>
          </main>

          ${children.footer.html}
        </div>
      </div>
    `;
  },
  onMount: (container, { children }) => {
    children.header.mount(container);
    children.footer.mount(container);
    children.posts.forEach((post) => post.mount(container));
  },
  onUnmount: () => {},
});

export default HomePage;
