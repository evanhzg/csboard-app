import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LocaleSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { locale, locales, asPath } = router;

  return (
    <div>
      {locales?.map((loc) => (
        <Link key={loc} href={asPath} locale={loc}>
          <a style={{ marginRight: 10 }}>{loc}</a>
        </Link>
      ))}
    </div>
  );
};

export default LocaleSwitcher;
