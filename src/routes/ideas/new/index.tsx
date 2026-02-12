import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { createIdea } from '@/api/ideas';

export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeaPage,
});

function NewIdeaPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    description: '',
    tags: '',
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createIdea,
    onSuccess: () => navigate({ to: '/ideas' }),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    const tags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');

    if (
      !formData.title.trim() ||
      !formData.summary.trim() ||
      !formData.description.trim()
    ) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await mutateAsync({
        ...formData,
        tags,
      });
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Create New Idea</h1>
      </div>
      <form onSubmit={handleSubmit} className='space-y-2'>
        <div>
          <label
            htmlFor='title'
            className='block text-gray-700 font-medium mb-1'
          >
            Title
          </label>
          <input
            id='title'
            name='title'
            type='text'
            value={formData.title}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter idea title'
          />
        </div>

        <div>
          <label
            htmlFor='summary'
            className='block text-gray-700 font-medium mb-1'
          >
            Summary
          </label>
          <input
            id='summary'
            name='summary'
            type='text'
            value={formData.summary}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter idea summary'
          />
        </div>

        <div>
          <label
            htmlFor='body'
            className='block text-gray-700 font-medium mb-1'
          >
            Description
          </label>
          <textarea
            id='body'
            name='description'
            rows={6}
            value={formData.description}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Write out the description of your idea'
          />
        </div>

        <div>
          <label
            htmlFor='tags'
            className='block text-gray-700 font-medium mb-1'
          >
            Tags
          </label>
          <input
            id='tags'
            name='tags'
            type='text'
            value={formData.tags}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='optional tags, comma separated'
          />
        </div>

        <div className='mt-5'>
          <button
            type='submit'
            disabled={isPending}
            className='block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isPending ? 'Creating...' : 'Create Idea'}
          </button>
        </div>
      </form>
    </div>
  );
}
