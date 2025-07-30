import {
  useGetNotesByShopIdQuery,
  useCreateNoteMutation,
  useDeleteNotesBynoteIdMutation,
} from '../redux/appSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import ShimmerNoteCard from '../../ShimmerUis/ShimmerNoteCard';

const ShopNotes = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, refetch, isLoading } = useGetNotesByShopIdQuery(user._id);
  const [createNote] = useCreateNoteMutation();
  const [deleteNote] = useDeleteNotesBynoteIdMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ shopId: '', title: '', content: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await deleteNote(noteId).unwrap();
      toast.success('Note deleted successfully!');
      refetch();
    } catch (err) {
      toast.error('Failed to delete note');
      console.error(err);
    }
  };

  const handleCreateNote = async () => {
    if (!newNote.title || !newNote.content) {
      toast.error('Please fill in both title and content');
      return;
    }

    try {
      await createNote({
        shopId: user._id,
        title: newNote.title,
        content: newNote.content,
      }).unwrap();

      toast.success('Note created successfully!');
      setNewNote({ shopId: '', title: '', content: '' });
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to create note');
      console.error(err);
    }
  };

  const filteredNotes = data?.notes?.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Top Bar */}
      <div className="flex justify-between mb-4 items-center p-2">
        <input
          placeholder="Search"
          className="p-2 shadow-md rounded-lg w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="p-2 rounded-lg bg-[#8EDF4C] text-white hover:bg-green-600 ml-4"
          onClick={() => {
            setNewNote({ shopId: user._id, title: '', content: '' });
            setIsModalOpen(true);
          }}
        >
          + Create Note
        </button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-scroll scrollbar-hide p-4">
        {isLoading ? (
          <>
            <ShimmerNoteCard />
            <ShimmerNoteCard />
            <ShimmerNoteCard />
          </>
        ) : filteredNotes && filteredNotes.length > 0 ? (
          filteredNotes.map((result, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 flex flex-col max-h-[300px] shadow-md transition-transform duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-lg">{result.title}</p>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteNote(result._id)}
                >
                  <MdDelete size={20} />
                </button>
              </div>
              <div className="text-gray-800 text-base overflow-auto">
                <p className="text-gray-400">{result.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 mt-10 text-lg">
            No Data Found
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create New Note</h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full mb-4 p-2 border rounded"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
            />
            <textarea
              placeholder="Content"
              className="w-full mb-4 p-2 border rounded"
              rows={4}
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
            />

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                onClick={handleCreateNote}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopNotes;
