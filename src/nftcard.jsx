import React from 'react';
import {MediaCard, Subheading, TextContainer, Link} from '@shopify/polaris';

const NftCard = ({image, id, title, address}) => {

  // Creates a separate variable here to pass into the description field of the media card
  // A workaround due to the limitations of Polaris
  const description = (
    // Slicing below is done to abstract away unnecessary information
    <TextContainer>
      {/* Slices the token ID which is in hexadecimal */}
      <Subheading>
        {`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}
      </Subheading>
      {/* Slices the address and adds an Etherscan hyperlink  */}
      <Link url={`https://etherscan.io/token/${address}`}>
        {`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}
      </Link>
    </TextContainer>
  )

  // Converts the token ID from hexadecimal to decimal
  const decimalId = parseInt(id, 16);

  return(
    <MediaCard
      portrait
      title={title}
      // Redirects users to /nft/:address/:id when they click "Details"
      primaryAction={{
          content: 'Details',
          url: `/nft/${address}/${decimalId}`
        }}
      description={description}
      size="small"
    >

      <img
        alt=""
        width="100%"
        height="100%"
        style={{ objectFit: 'cover', objectPosition: 'center',}}

        src={image}
      />
    </MediaCard>
  );
}

export default NftCard;