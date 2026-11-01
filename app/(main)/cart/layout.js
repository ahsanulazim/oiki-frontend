export const metadata = {
  title: "Shopping Cart | Oiki Lifestyle",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function CartLayout({ children }) {
  return <>{children}</>;
}

