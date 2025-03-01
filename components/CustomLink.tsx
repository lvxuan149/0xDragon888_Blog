import Link from "next/link";
import { useRouter } from "next/router";

export const CustomLink = (props: any) => {
  const router = useRouter();
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));
  const isCurrentPath = router.pathname === href;

  if (isInternalLink) {
    if (isCurrentPath) {
      // If we're already on this page, render as a div to prevent navigation
      const { href, ...restProps } = props;
      return <div {...restProps} />;
    }
    return <Link href={href} {...props} />;
  }

  return <a target="__blank" rel="noopener noreferrer" {...props} />;
};
