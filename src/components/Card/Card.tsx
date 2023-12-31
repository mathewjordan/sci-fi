import * as AspectRatio from "@radix-ui/react-aspect-ratio";

import { Content, Placeholder, Wrapper } from "@components/Card/Card.styled";
import { LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";

import Figure from "@components/Figure/Figure";
import { Label } from "@samvera/clover-iiif/primitives";
import Link from "next/link";
import { SearchResponseItem } from "@customTypes/search/search";
import { getLabel } from "@lib/iiif/label";
import { getRandomItem } from "@lib/utils";
import { useInView } from "react-intersection-observer";

interface CardProps {
  resource: SearchResponseItem;
}

const Card: React.FC<CardProps> = ({ resource }) => {
  let aspectRatio = 1;

  const { label, homepage, thumbnail } = resource;

  // @ts-ignore
  const item = getRandomItem(thumbnail);

  const width = item?.width;
  const height = item?.height;

  if (width && height) aspectRatio = width / height;

  const { ref, inView } = useInView();
  const alt = getLabel(label);

  return (
    <Wrapper ref={ref}>
      <Link href={homepage && homepage[0].id ? homepage[0].id : ""}>
        <AspectRatio.Root ratio={aspectRatio}>
          <Placeholder>
            <MotionConfig transition={{ duration: 1 }}>
              {inView && resource && (
                <LazyMotion features={domAnimation}>
                  <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Figure resource={thumbnail} alt={alt} />
                  </m.div>
                </LazyMotion>
              )}
            </MotionConfig>
          </Placeholder>
        </AspectRatio.Root>
        <Content>
          <Label label={label} as="h4" />
        </Content>
      </Link>
    </Wrapper>
  );
};

export default Card;
