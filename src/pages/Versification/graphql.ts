const toNodefields = `
  node_id
  node_type
  propertyKeys {
    property_key
    values {
      property_value {
        value
      }
      upVotes
      downVotes
      posts {
        id
      }
    }
  }
`;

export const buildNodesByNodeTypeQuery = (node_type: string) => `
  query {
    nodesByNodeType(node_type: "${node_type}") {
      ${toNodefields}
      nestedRelationships {
        toNode {
          ${toNodefields}
          nestedRelationships {
            toNode {
              ${toNodefields}
              nestedRelationships {
                toNode {
                  ${toNodefields}
                  nestedRelationships {
                    toNode {
                      ${toNodefields}
                      nestedRelationships {
                        toNode {
                          ${toNodefields}
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
