import { createComponent } from "../core/component";

const Footer = createComponent(
  () => `
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; ${new Date().getFullYear()} 항해플러스. All rights reserved.</p>
    </footer>
  `,
  () => {},
);

export default Footer;
