import * as THREE from 'three';

class Figure {
    constructor(scene, params = {}) {
        this.scene = scene;
        this.params = {
            x: 0,
            y: 0,
            z: 0,
            ry: 0,
            ...params
        };
        
        this.dimensions = {
            head: this.random(4, 8),
            bodyWidth: this.random(3, 6),
            bodyHeight: this.random(2, 8),
            legHeight: this.random(1, 5)
        };
        
        this.floorGroup = new THREE.Group();
        this.group = new THREE.Group();
        this.floorGroup.add(this.group);
        this.scene.add(this.floorGroup);
        
        this.group.position.set(this.params.x, 0, this.params.z);
        this.group.rotation.y = this.params.ry;
        
        this.headHue = this.random(0, 260);
        this.bodyHue = this.random(0, 260);
        this.headMaterial = new THREE.MeshLambertMaterial({ color: `hsl(${this.headHue}, 30%, 50%)` });
        this.bodyMaterial = new THREE.MeshLambertMaterial({ color: `hsl(${this.bodyHue}, 85%, 50%)` });
    }
    
    random(min, max, float = false) {
        const val = Math.random() * (max - min) + min;
        return float ? val : Math.floor(val);
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    
    createBody() {
        this.body = new THREE.Group();
        const geometry = new THREE.BoxGeometry(this.dimensions.bodyWidth, this.dimensions.bodyHeight, this.dimensions.bodyWidth);
        const bodyMain = new THREE.Mesh(geometry, this.bodyMaterial);
        
        this.body.add(bodyMain);
        this.group.add(this.body);
        
        this.createLegs();
    }
    
    createHead() {
        const headSize = this.dimensions.head;
        this.head = new THREE.Group();
        
        const geometry = new THREE.BoxGeometry(headSize, headSize, headSize);
        const headMain = new THREE.Mesh(geometry, this.headMaterial);
        this.head.add(headMain);
        
        this.group.add(this.head);
        
        this.head.position.y = (this.dimensions.bodyHeight * 0.5) + (this.dimensions.head * 0.5) + 0.4;
        
        this.createEyes();
    }
    
    createArms() {
        const height = this.random(2, 4);
        const width = 0.6;
        const xPos = this.dimensions.bodyWidth * 0.5 + width;
        
        const rz = this.random(5, 85, true);
        
        for(let i = 0; i < 2; i++) {
            const armGroup = new THREE.Group();
            const geometry = new THREE.BoxGeometry(width, height, width);
            const arm = new THREE.Mesh(geometry, this.headMaterial);
            const m = i % 2 === 0 ? 1 : -1;
            
            armGroup.add(arm);
            this.body.add(armGroup);
            
            arm.position.y = height * -0.5;
            
            armGroup.position.x = m * xPos;
            armGroup.position.y = this.dimensions.bodyHeight * 0.5 - 0.5;
            
            armGroup.rotation.z = this.degreesToRadians(rz * m);
        }
    }
    
    createEyes() {
        const eyes = new THREE.Group();
        const r = this.random(0.35, 0.6, true);
        const geometry = new THREE.SphereGeometry(r, 12, 8);
        const material = new THREE.MeshLambertMaterial({ color: 0x44445c });
        
        const eyeX = this.random(r + 0.2, this.dimensions.head * 0.5 - r, true);
        const eyeY = this.random(0, 1, true);
        
        for(let i = 0; i < 2; i++) {
            const eye = new THREE.Mesh(geometry, material);
            const m = i % 2 === 0 ? 1 : -1;
            
            eyes.add(eye);
            eye.position.x = eyeX * m;
        }
        
        this.head.add(eyes);
        
        eyes.position.y = eyeY * -1;
        eyes.position.z = this.dimensions.head * 0.5;
    }
    
    createLegs() {
        const width = 0.6;
        const legs = new THREE.Group();
        const geometry = new THREE.BoxGeometry(width, this.dimensions.legHeight, width);
        
        for(let i = 0; i < 2; i++) {
            const leg = new THREE.Mesh(geometry, this.headMaterial);
            const m = i % 2 === 0 ? 1 : -1;
            
            legs.add(leg);
            leg.position.x = m * 0.7;
            leg.position.y = this.dimensions.legHeight * -0.5;
        }
        
        this.group.add(legs);
        legs.position.y = this.dimensions.bodyHeight * -0.5;
        
        this.body.add(legs);
    }
    
    positionVertically() {
        const boundingBox = new THREE.Box3();
        boundingBox.setFromObject(this.floorGroup);
        const size = boundingBox.getSize(new THREE.Vector3());

        this.group.position.y = size.y * 0.5;
        this.floorGroup.position.y = -10;
    }
    
    init() {
        this.createBody();
        this.createHead();
        this.createArms();
        this.positionVertically();
    }
}

export default Figure;
