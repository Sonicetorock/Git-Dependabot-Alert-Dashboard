import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react';

const BreadCrumb = ({ props }) => {
  // requires array of locations inside props
  return (
    <>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
        fontFamily="Georgia"
        fontSize={{ base: "sm", md: "sm", lg: "lg" }}
        boxShadow="xs"
        p={2}
        rounded={10}
        bgColor="white"
      >
        {props.map((item, index) => {
          return (
            <BreadcrumbItem key={item} fontSize={{ base: "xs", md: "xs", lg: "lg" }}>
              <BreadcrumbLink href="#">{item}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default BreadCrumb;
