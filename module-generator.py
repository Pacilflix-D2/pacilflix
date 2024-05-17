from os import walk, path, makedirs

start_directory = path.join('src', 'app')
modules_path = path.join('src', 'modules')

for root, dirs, files in walk(start_directory):
    for file in files:
        if file.endswith('.tsx') and file != 'layout.tsx' and not (root == start_directory and file == 'page.tsx'):
            file_path = path.join(root, file)
            file_path = file_path.removeprefix(start_directory).removeprefix('\\')
            
            file_path_list = file_path.split('\\')[:-1]
            # print(file_path_list)

            for folder in file_path_list[::-1]:
                if not folder.startswith('['):
                    module_name = folder.capitalize() + 'Module'
                    print(module_name)
                    
                    created_module_path = path.join(modules_path, module_name)
                    makedirs(created_module_path)
                    open(path.join(created_module_path, 'index.tsx'), 'w')
                    open(path.join(created_module_path, 'interface.ts'), 'w')
                    
                    break