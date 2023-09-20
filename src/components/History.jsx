// External imports
import { useState, useEffect } from "react";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";

// Internal imports
import { DeleteIcon } from "./icons/DeleteIcon";
import { EyeIcon } from "./icons/EyeIcon";

const History = ({ data, deleteItem }) => {

  const substringLength = 26;

  useEffect(() => {
    list.reload();
  }, [data]);

  const [isSorted, setIsSorted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);

  let list = useAsyncList({
    async load() {
      setIsLoading(false);
      const items = data;
      return {
        items,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });

  useEffect(() => {
    if (!isSorted && list.items.length > 0) {
      list.sort({ column: "datetime", direction: "descending" });
      setIsSorted(true);
    }
  }, [isSorted, list.items]);

  const getEmojiFromValue = (value) => {
    switch (value) {
      case 2:
        return "😁";
      case 1:
        return "🙂";
      case 0:
        return "😐";
      case -1:
        return "☹️";
      case -2:
        return "😭";
      case -3:
        return "💀";
      default:
        return "";
    }
  };

  return (
    <>
      <Table
        aria-label="Entry Table"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: "min-h-[400px]",
        }}
        isStriped
      >
        <TableHeader>
          <TableColumn key="value" allowsSorting>
            Score
          </TableColumn>
          <TableColumn key="note" allowsSorting>
            Note
          </TableColumn>
          <TableColumn key="datetime" allowsSorting>
            Date
          </TableColumn>
          <TableColumn key="Modify">View or Delete</TableColumn>
        </TableHeader>
        <TableBody
          items={list.items}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "value" ? (
                    <span className="emoji-cell">
                      {getEmojiFromValue(item.value)}
                    </span>
                  ) : columnKey === "datetime" ? (
                    item.datetime.toDate().toLocaleDateString()
                  ) : columnKey === "note" ? (
                    <span title={item.note}>
                      {item.note.length > substringLength
                        ? `${item.note.substring(0, substringLength)}...`
                        : item.note}
                    </span>
                  ) : columnKey === "Modify" ? (
                    <div className="relative flex items-center gap-2">
                      <Tooltip content="Details">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <Button
                            isIconOnly
                            variant="bordered"
                            onPress={() => {
                              setSelectedItem(item);
                              onOpen();
                            }}
                          >
                            <EyeIcon />
                          </Button>
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete entry">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50 ml-5">
                          <Button
                            isIconOnly
                            color="danger"
                            variant="bordered"
                            onPress={() => {
                              deleteItem(item.id);
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </span>
                      </Tooltip>
                    </div>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectedItem && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Details
                </ModalHeader>
                <ModalBody>
                  <p>
                    Date: {selectedItem.datetime.toDate().toLocaleDateString()}
                  </p>
                  <p>Score: {getEmojiFromValue(selectedItem.value)}</p>
                  <p>Note: {selectedItem.note}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default History;
